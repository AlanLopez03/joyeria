// src/app/components/mostrar-productos/mostrar-productos.component.ts

import {
  Component,
  OnInit,
  HostListener,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { InventarioService } from '../../services/inventario/inventario.service';
import { Producto } from '../../models/producto';
import { Router } from '@angular/router';
import { addProducto } from '../../models/carrito';
import { CarritoService } from '../../services/carrito/carrito.service';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { IdiomaService } from '../../services/idioma/idioma.service';
import { TranslateService } from '@ngx-translate/core';
import { NavbarService } from '../../services/navbar/navbar.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-mostrar-productos',
  templateUrl: './mostrar-productos.component.html',
  styleUrls: ['./mostrar-productos.component.css']
})
export class MostrarProductosComponent implements OnInit, AfterViewInit, OnDestroy {
  // —————— 1) PROPIEDADES PARA PRODUCTOS ——————
  inserta = new addProducto();
  producto = new Producto();
  productos: Producto[] = [];
  buscar: string = '';
  idioma = localStorage.getItem('idioma') ?? 'es';
  liga: string = environment.API_URL_IMAGENES + '/productos';

  /** Índice del primer producto visible en el carrusel */
  currentIndex = 0;
  /** Cantidad de productos visibles según ancho */
  pageSize = 5;
  /** Si true → mostramos cuadrícula “list view”; si false → mostramos carrusel */
  isListView = false;
  private autoplayProdSub?: Subscription;
  @ViewChild('carouselScroll', { static: false }) carouselScroll!: ElementRef<HTMLElement>;

  // —————— 2) PROPIEDADES PARA CARRUSEL DE BANNERS ——————
  bannerImages: string[] = [
    'assets/banners/banner1.jpeg',
    'assets/banners/banner2.jpeg',
    'assets/banners/banner3.jpeg',
    'assets/banners/banner4.jpeg',
    'assets/banners/banner5.jpeg'
  ];
  bannerIndex = 0;
  bannerPageSize = 3;
  private autoplayBannerSub?: Subscription;
  @ViewChild('bannerScroll', { static: false }) bannerScroll!: ElementRef<HTMLElement>;

  constructor(
    private inventarioService: InventarioService,
    private carritoService: CarritoService,
    private router: Router,
    private idiomaService: IdiomaService,
    private translate: TranslateService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    // 1) Ajustar pageSize inicial para carrusel de productos
    this.actualizarPageSize(window.innerWidth);

    // 2) Suscribir a cambios de idioma
    this.idiomaService.currentLanguage.subscribe(lang => {
      this.translate.use(lang);
      this.idioma = lang;
    });

    // 3) Suscribir al término de búsqueda enviado desde el navbar
    this.navbarService.search$.subscribe((searchTerm: string) => {
      this.buscar = searchTerm;
      this.Buscar();
    });

    // 4) ––––––––––––– VERIFICAR localStorage “Categoria” y “Arreglo” –––––––––––––
    const cat = localStorage.getItem('Categoria');
    const arr = localStorage.getItem('Arreglo');

    // Si NO hay categoría o vale "0", o NO hay "Arreglo", cargamos todo en modo carrusel:
    if ((cat === null || cat === '0') || arr === null) {
      this.isListView = false;
      this.cargarProductos();
    } else {
      // Si existe una categoría válida, filtramos automáticamente:
      this.filtrarProductos(cat);
    }

    // 5) Autoplay para productos: cada 5s avanza (solo si no estamos en modo listado)
    this.autoplayProdSub = interval(5000).subscribe(() => {
      if (!this.isListView) {
        this.nextProducto();
      }
    });

    // 6) Ajustar bannerPageSize inicial y autoplay para banners
    this.actualizarBannerPageSize(window.innerWidth);
    this.autoplayBannerSub = interval(6000).subscribe(() => {
      this.nextBanner();
    });
  }

  ngAfterViewInit(): void {
    // Al iniciar, asegurarse de que los scrolls comiencen en 0
    if (this.carouselScroll) {
      this.carouselScroll.nativeElement.scrollLeft = 0;
    }
    if (this.bannerScroll) {
      this.bannerScroll.nativeElement.scrollLeft = 0;
    }
  }

  ngOnDestroy(): void {
    if (this.autoplayProdSub) this.autoplayProdSub.unsubscribe();
    if (this.autoplayBannerSub) this.autoplayBannerSub.unsubscribe();
  }

  // ===================== MÉTODOS DE CARGA E INTERACCIONES =====================

  private cargarProductos(): void {
    this.inventarioService.list().subscribe(
      (res: any) => {
        this.productos = res || [];
        this.currentIndex = 0;
        this.isListView = false;
        // Volver al inicio del carrusel de productos
        setTimeout(() => {
          if (this.carouselScroll) {
            this.carouselScroll.nativeElement.scrollLeft = 0;
          }
        }, 0);
      },
      err => console.error('Error al cargar productos:', err)
    );
  }

  verProducto(id: number): void {
    this.router.navigate(['/home/verProducto', id]);
  }

  agregarProducto(id: any): void {
    const idUsuario = parseInt(localStorage.getItem('idUsuario') ?? '1');
    const inserta = new addProducto();
    inserta.setAtributos(id, idUsuario, 1);

    this.inventarioService.listone(id).subscribe(
      (res: any) => {
        const stock = res.stock;
        if (stock > 0) {
          this.carritoService.insertar(inserta).subscribe(
            () => {
              this.translate.get('carrito').subscribe(translations => {
                Swal.fire({
                  title: translations.title,
                  text: translations.text,
                  icon: 'success',
                  confirmButtonText: translations.confirm
                });
              });
            },
            err => console.error('Error al agregar al carrito:', err)
          );
        } else {
          this.translate.get('noStock').subscribe(translations => {
            Swal.fire({
              title: translations.title,
              text: translations.text,
              icon: 'warning',
              confirmButtonText: translations.confirm
            });
          });
        }
      },
      err => console.error('Error al verificar stock del producto:', err)
    );
  }

  Buscar(): void {
    if (this.buscar.trim() === '') {
      // Si el campo de búsqueda queda vacío, volvemos a “modo carrusel”
      this.isListView = false;
      this.cargarProductos();
    } else {
      this.inventarioService.BuscarProducto(this.buscar, this.idioma).subscribe(
        (res: any) => {
          if (Array.isArray(res)) {
            // Si viene un array de productos, lo asignamos directamente
            this.productos = res;
          } else if (res.id_producto == -1 || res.id_producto === '-1') {
            // Si el backend indica “-1” (ya sea número o cadena), lo tomamos como “sin resultados”
            this.productos = [];
          } else {
            // En caso de venir un solo objeto válido, lo convertimos en array de 1
            this.productos = [res];
          }
          this.currentIndex = 0;
          // PASAMOS A MODO LISTADO (ocultamos carruseles y mostramos grid)
          this.isListView = true;
        },
        err => console.error('Error al buscar producto:', err)
      );
    }
  }

  filtrarProductos(id: any): void {
    // PASAMOS A MODO LISTADO antes de solicitar resultados
    this.isListView = true;
    this.inventarioService.filtrarProductos(id).subscribe(
      (res: any) => {
        this.productos = res || [];
        this.currentIndex = 0;
        // isListView ya en true → carruseles ocultos, grid visible
      },
      err => console.error('Error al filtrar productos:', err)
    );
  }

  // ===================== MÉTODOS CARRUSEL DE PRODUCTOS =====================

  nextProducto(): void {
    const total = this.productos.length;
    if (total === 0) return;
    this.currentIndex = (this.currentIndex + 1) % total;
    this.scrollToProducto(this.currentIndex);
  }

  prevProducto(): void {
    const total = this.productos.length;
    if (total === 0) return;
    this.currentIndex = (this.currentIndex - 1 + total) % total;
    this.scrollToProducto(this.currentIndex);
  }

  private scrollToProducto(targetIndex: number): void {
    if (!this.carouselScroll) return;
    const container = this.carouselScroll.nativeElement;
    const cardWidth = container.clientWidth / this.pageSize;
    const scrollPosition = cardWidth * targetIndex;
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  get productosActuales(): Producto[] {
    const total = this.productos.length;
    const result: Producto[] = [];
    if (total === 0) return result;
    for (let i = 0; i < this.pageSize; i++) {
      const idx = (this.currentIndex + i) % total;
      result.push(this.productos[idx]);
    }
    return result;
  }

  onArrowPrevProducto(): void {
    this.prevProducto();
  }

  onArrowNextProducto(): void {
    this.nextProducto();
  }

  // ===================== MÉTODOS CARRUSEL DE BANNERS (CÍCLICO) =====================

  nextBanner(): void {
    const total = this.bannerImages.length;
    if (total === 0 || !this.bannerScroll) return;
    this.bannerIndex = (this.bannerIndex + this.bannerPageSize) % total;
    this.scrollToBanner(this.bannerIndex);
  }

  prevBanner(): void {
    const total = this.bannerImages.length;
    if (total === 0 || !this.bannerScroll) return;
    this.bannerIndex = (this.bannerIndex - this.bannerPageSize + total) % total;
    this.scrollToBanner(this.bannerIndex);
  }

  private scrollToBanner(targetIndex: number): void {
    if (!this.bannerScroll) return;
    const container = this.bannerScroll.nativeElement;
    const cardWidth = container.clientWidth / this.bannerPageSize;
    const scrollPosition = cardWidth * targetIndex;
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  // ===================== REAJUSTES AL CAMBIAR TAMAÑO DE VENTANA =====================

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const width = (event.target as Window).innerWidth;
    this.actualizarPageSize(width);
    this.actualizarBannerPageSize(width);

    // Ajustar scroll de productos
    if (this.currentIndex >= this.productos.length) {
      this.currentIndex = 0;
    }
    this.scrollToProducto(this.currentIndex);

    // Ajustar scroll de banners
    const totalB = this.bannerImages.length;
    if (this.bannerIndex >= totalB) {
      this.bannerIndex = 0;
    }
    this.scrollToBanner(this.bannerIndex);
  }

  private actualizarPageSize(width: number): void {
    const minItemWidth = 250;
    const calculado = Math.floor(width / minItemWidth);
    this.pageSize = Math.max(1, calculado);
  }

  private actualizarBannerPageSize(width: number): void {
    if (width >= 1200) {
      this.bannerPageSize = 3;
    } else if (width >= 800) {
      this.bannerPageSize = 2;
    } else {
      this.bannerPageSize = 1;
    }
  }
}
