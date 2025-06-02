import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito/carrito.service';
import { InventarioService } from '../../services/inventario/inventario.service';
import { Router } from '@angular/router';
import { Carrito, addProducto } from '../../models/carrito';
import { Producto } from '../../models/producto';
import { Compra } from '../../models/compra';
import Swal from 'sweetalert2';
import { Pedidos, nuevoPedido } from '../../models/pedidos';
import { error } from 'jquery';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Domicilio } from '../../models/domicilio';
import { environment } from '../../environments/environment';
import { IdiomaService } from '../../services/idioma/idioma.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  domicilios: Domicilio[] = [];
  domicilio = new Domicilio();
  pedidos: Pedidos[] = [];
  pedido = new Pedidos();
  producto = new Producto();
  productos: Producto[] = [];
  carrito1: Carrito = new Carrito();
  carrito: Carrito[] = [];
  pageSize = 5;
  idDomicilio: number = 0;
  p = 1;
  liga: string = environment.API_URL_IMAGENES + '/productos';
  idioma = localStorage.getItem('idioma') ?? 2;
  Anterior: any;
  Siguiente: any;

  constructor(private carritoService: CarritoService, private inventarioService: InventarioService, private router: Router, private usuarioService: UsuarioService
    , private idiomaService: IdiomaService, private translate: TranslateService
  ) { }
  inserta = new addProducto();
  ngOnInit(): void {
    this.carrito = [];
    this.productos = [];

    $(document).ready(function () {
      $('#direccion').click(function () {
        $(this).css('background-color', '#ff0000'); // Cambiar a rojo
      });
    })

    //this.idiomaService.currentLanguage.subscribe((res: any) => {
    //  this.translate.use(res);
    //})
    this.idDomicilio = 0;
    this.carritoService.listone(localStorage.getItem('idUsuario')).subscribe(
      (res: any) => {

        if (res == false) {

          this.translate.get('sinProducto').subscribe((translations) => {
            Swal.fire({
              title: translations.title,
              icon: 'error',
              confirmButtonText: translations.confirm
            })
          })
        }
        else {
          this.carrito = res;
          console.log("Carrito", this.carrito);
          for (let producto of this.carrito) {
            //console.log("Producto",producto.idProducto);
            this.inventarioService.listone(producto.idProducto).subscribe(
              (res: any) => {
                this.productos.push(res);
              },
              err => console.log(err)
            );

          }
          console.log(this.productos);
        }
        //console.log("Productos", this.productos);


      },
      err => console.log(err)

    );
    this.usuarioService.verDomicilios(localStorage.getItem('idUsuario')).subscribe(
      (res: any) => {
        if (res != false)
          this.domicilios = res;
        else 
        this.translate.get('sinDomicilios').subscribe((translations) => 
        {
          Swal.fire({
            title: translations.title,
            text: translations.text,
            icon: 'error',
            confirmButtonText: translations.confirm
          })
        })
      },

      err => console.log(err)
    );
    this.idiomaService.currentLanguage.subscribe(lang => {
      this.translate.use(lang);

      if (lang == '2') {
        this.Anterior = 'Anterior';
        this.Siguiente = 'Siguiente';
      }
      else if (lang == '1') {
        this.Anterior = 'Previous';
        this.Siguiente = 'Next';
      }
    });

  }
  setDomicilio(id: any) {
    this.idDomicilio = id;
  }
  eliminarProducto(id: any) {
    var idUsuario = localStorage.getItem('idUsuario');
    this.translate.get('CarritoUsu').subscribe((translations) => {
      Swal.fire({
        title: translations.title,
        text: translations.text,
        icon: 'warning',
        confirmButtonText: translations.confirm,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',

      }).then((result) => {

        if (result.isConfirmed)
          this.carritoService.listarCompras(idUsuario).subscribe((res: any) => {
            var productos = res;//Obtener la cantidad de productos en el carrito
            for (let producto of productos) {
              var datos = {
                idProducto: producto.idProducto,
                stock: producto.cantidad
              }
              //console.log("Agregando stock=", datos.stock);
              this.inventarioService.agregarStock(datos).subscribe(
                (res: any) => {

                },
                err => console.log(err)
              );

            }

            this.carritoService.eliminarProducto(id).subscribe(
              (res: any) => {
                this.translate.get('eliminaArti').subscribe((translations) => {
                  Swal.fire({
                    title: translations.title,
                    text: translations.text,
                    icon: 'success',
                    confirmButtonText: translations.confirm
                  }).then((result) => {
                    this.ngOnInit();
                  })
                })
              }, err => console.log(err));
          })
      })
    })


  }
  insertarProducto(id: any, decremento?: any, cantidad?: any) {//Se debe mandar un objeto de tipo addProducto
    this.producto = new Producto();
    var a = localStorage.getItem('idUsuario') ?? '1';
    var stock = 0;

    this.inventarioService.listone(id).subscribe(
      (res: any) => {
        stock = res.stock;//Obtiene el stock del producto
        if (stock > 0 || decremento) {//debe insertar el producto si hay stock o si se va a decrementar,ya que se retornaria un producto al stock
          console.log("d", decremento)
          console.log("stock", stock + decremento);

          if (decremento != null && -(decremento) < cantidad) {
            this.inserta.setAtributos(id, parseInt(a), -1);
            this.carritoService.insertar(this.inserta).subscribe((res: any) => {
              this.ngOnInit();
            },
              err => console.log(err));
          }
          else if (decremento == null) {
            console.log("agregando")
            this.inserta.setAtributos(id, parseInt(a), 1);
            this.carritoService.insertar(this.inserta).subscribe((res: any) => {
              this.ngOnInit();
            },
              err => console.log(err));
          }



        }
        else {
          this.translate.get('noStock').subscribe((translations) => {
            Swal.fire({
              title: translations.title,
              text: translations.text,
              icon: 'warning',
              confirmButtonText: translations.confirm
            })
          })
        }
      },
      err => console.log(err)
    );

  }
  limpiarCarrito() {
    var idUsuario = localStorage.getItem('idUsuario');
    this.translate.get('LimpiarCarro').subscribe((translations) => {
      Swal.fire({
        title: translations.title,
        text: translations.text,
        confirmButtonText: translations.confirm,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          //Debe agregar al stock si se limpia el carrito
          this.carritoService.listarCompras(idUsuario).subscribe((res: any) => {
            //console.log(res);
            //Obtenemos el arreglo con el carrito de productos
            var productos = res;//Obtener la cantidad de productos en el carrito
            for (let producto of productos) {
              var datos = {
                idProducto: producto.idProducto,
                stock: producto.cantidad
              }
              //console.log("Agregando stock=", datos.stock);
              this.inventarioService.agregarStock(datos).subscribe(

                err => console.log(err)
              );

            }
            this.carritoService.limpiarCarrito(idUsuario).subscribe(
              (res: any) => {

                this.ngOnInit();
                this.translate.get('CarritoLim').subscribe((translations) => {
                  Swal.fire({
                    title: translations.title,
                    text: translations.text,
                    icon: 'success',
                    confirmButtonText: translations.confirm
                  })
                })
              }, err => console.log(err));
          }, err => console.log(err)
          );




        }
      })
    })
  }
  pagar() {
    this.router.navigate(['/pagar']);
  }

  comprarCarrito() {
    if (this.idDomicilio <= 0 || this.idDomicilio == null || this.domicilios.length == 0) {
      this.translate.get('Domicilio').subscribe((translations) => {
        Swal.fire({
          title: translations.title,
          text: translations.text,
          icon: 'error',
          confirmButtonText: translations.confirm
        })
      })
    }

    else {
      var objeto = new Compra();
      var fecha = new Date();//Se debe formatear la fecha a yyyy-mm-dd
      let fechaActual = new Date();
      // Obtener el año, mes y día
      let año = fechaActual.getFullYear();
      let mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2); // Agregar un cero delante si es necesario
      let dia = ("0" + fechaActual.getDate()).slice(-2); // Agregar un cero delante si es necesario
      // Formatear la fecha actual en el formato "yyyy-mm-dd"
      let fechaActualFormateada = `${año}-${mes}-${dia}`;
      //console.log(fechaActualFormateada); // Salida: "2022-02-06" (por ejemplo)
      objeto.set(fechaActualFormateada, 1, this.idDomicilio);//Cambiar fecha
      //console.log("Domicilio",this.idDomicilio);

      this.carritoService.comprar(localStorage.getItem('idUsuario'), objeto).subscribe(
        (res: any) => {
          if (res == false) {
            this.translate.get('noStock').subscribe((translations) => {
              Swal.fire({
                title: translations.title,
                text: translations.text,
                icon: 'warning',
                confirmButtonText: translations.confirm
              })
            })
          }
          else {
            this.translate.get('Compra').subscribe((translations) => {
              Swal.fire({
                title: translations.title,
                text: translations.text,
                icon: 'success',
                confirmButtonText: translations.confirm
              })
            })
            this.router.navigateByUrl('/home');
            this.producto = new Producto();
            //this.ngOnInit();
          }

        },
        err => console.log(err)
      );
    }
  }

}

