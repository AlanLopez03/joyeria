import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { environment } from '../../environments/environment';
import { IdiomaService } from '../../services/idioma/idioma.service';
import { TranslateService } from '@ngx-translate/core';
import { InventarioService } from '../../services/inventario/inventario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oferta-usuario',
  templateUrl: './oferta-usuario.component.html',
  styleUrls: ['./oferta-usuario.component.css']
})
export class OfertaUsuarioComponent implements OnInit {
  productos: Producto[] = [];
  idioma = localStorage.getItem('idioma') ?? 'es';
  Anterior: string = 'Anterior';
  Siguiente: string = 'Siguiente';
  pageSize: number = 5;
  p: number = 1;
  liga: string = environment.API_URL_IMAGENES + '/productos';

  constructor(
    private idiomaService: IdiomaService,
    private translate: TranslateService,
    private inventarioService: InventarioService,
    private router: Router
  ) {
    this.idiomaService.currentLanguage.subscribe((lang) => {
      if (lang) {
        this.idioma = lang;
        this.translate.use(lang);
        this.Anterior = lang === 'es' ? 'Anterior' : 'Previous';
        this.Siguiente = lang === 'es' ? 'Siguiente' : 'Next';
      }
    });
  }

  ngOnInit(): void {
    this.cargarOfertasDesdeBackend();
  }

  cargarOfertasDesdeBackend(): void {
    this.inventarioService.obtenerOfertas().subscribe(
  (res) => {
    const productos = res as Producto[];
    this.productos = productos.map((prod) => ({
      ...prod,
      descuento: Number(prod.descuento),
      inicio_descuento: new Date(prod.inicio_descuento).toLocaleDateString(),
      fin_descuento: new Date(prod.fin_descuento).toLocaleDateString()
    }));
    console.log('Ofertas cargadas:', this.productos);
    //localStorage.setItem('Arreglo', JSON.stringify(this.productos));
  },
  (err) => console.error('Error al obtener ofertas:', err)
);

  }
  verProducto(id: number): void {
    this.router.navigate(['/home/verProducto', id]);
  }
}
