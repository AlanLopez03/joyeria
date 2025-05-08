import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario/inventario.service';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Categoria } from '../../models/categoria';
import { Material } from '../../models/material';
import { Marca } from '../../models/marca';
import { MaterialService } from '../../services/material/material.service';
import { MarcaService } from '../../services/marca/marca.service';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ImagenesService } from '../../services/imagenes/imagenes.service';
import { IdiomaService } from '../../services/idioma/idioma.service';
import { TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { data } from 'jquery';

declare var $: any;

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  idProducto = Number;
  categoria: Categoria = new Categoria();
  categorias: Categoria[] = [];
  material: Material = new Material();
  materiales: Material[] = [];
  marca: Marca = new Marca();
  marcas: Marca[] = [];
  producto = new Producto();
  productos: Producto[] = [];
  id_producto : any;
  fecha = String;
  pageSize = 4;
  p = 1;
  Anterior:any;
  Siguiente:any;
  Anterior1:any;
  Siguiente1:any;
  constructor(private inventarioService: InventarioService, private categoriaService: CategoriaService, private materialService: MaterialService,
    private marcaService: MarcaService, private router: Router, private imagenesService: ImagenesService, private translate: TranslateService,private idiomaService: IdiomaService) {
    this.imgPrincipal = null;
    this.fileToUpload = null;
    this.idiomaService.currentLanguage.subscribe(
      (msg) => {
        if (msg != ''){
          this.idioma = msg;
        }
      }
    )
  }
  imgPrincipal: any;
  fileToUpload: any;
  liga: string = environment.API_URL_IMAGENES + '/productos';
  idioma = localStorage.getItem('idioma') ?? "es";

  ngOnInit(): void {

    this.idiomaService.currentLanguage.subscribe(lang => {
      this.translate.use(lang);

      if(lang == 'es'){
        this.Anterior = 'Anterior';
        this.Siguiente = 'Siguiente';
      }
      else if(lang == 'en'){
        this.Anterior = 'Previous';
        this.Siguiente = 'Next';
      }
    });
    this.producto = new Producto();
    $(document).ready(function () {
      $('.dropdown-trigger').dropdown();
      $('.modal').modal();
      $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        i18n: {
          cancel: 'Cancelar',
          clear: 'Limpiar',
          done: 'Aceptar',
          previousMonth: '‹',
          nextMonth: '›',
          months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
          weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
          weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
        }
      });
      $('#descuento').prop('checked', false);
      $('#descuento1').prop('checked', false);
      $('#inicio_descuento').prop('disabled', true);
      $('#fin_descuento').prop('disabled', true);
      $('#inicio_descuento1').prop('disabled', true);
      $('#fin_descuento1').prop('disabled', true);
      $('#name1').prop('disabled', true);
      $('#name2').prop('disabled', true);
    });

    this.inventarioService.list().subscribe((resProductos: any) => {
      this.productos = resProductos;
      if (resProductos == false) {
        this.translate.get(['NoHayProductos.title', 'NoHayProductos.text', 'NoHayProductos.confirm']).subscribe(translations => {
          Swal.fire({
            title: translations['NoHayProductos.title'],
            text: translations['NoHayProductos.text'],
            icon: 'warning',
            confirmButtonText: translations['NoHayProductos.confirm'],
          })
        })
      }
      for (let i = 0; i < this.productos.length; i++) {
        let aux = new Date(this.productos[i].inicio_descuento);
        let aux2 = new Date(this.productos[i].fin_descuento);
        this.productos[i].inicio_descuento = aux.toLocaleDateString()
        this.productos[i].fin_descuento = aux2.toLocaleDateString()
      }


    }, err => console.log(err));

    this.categoriaService.list().subscribe((resCategorias: any) => {
      this.categorias = resCategorias;
    }, err => console.log(err));

    this.materialService.list().subscribe((resMateriales: any) => {
      this.materiales = resMateriales;
    }, err => console.log(err));

    this.marcaService.list().subscribe((resMarcas: any) => {
      this.marcas = resMarcas;
    }, err => console.log(err));

  }
  revisarDescuento() {

    if ($('#descuento').is(':checked')) {
      $('#inicio_descuento').prop('disabled', false);
      $('#fin_descuento').prop('disabled', false);
      $('#name1').prop('disabled', false);
    }
    else {
      $('#inicio_descuento').prop('disabled', true);
      $('#fin_descuento').prop('disabled', true);
      $('#name1').prop('disabled', true);
    }
    if ($('#descuento1').is(':checked')) {
      $('#inicio_descuento1').prop('disabled', false);
      $('#fin_descuento1').prop('disabled', false);
      $('#name2').prop('disabled', false);
    }
    else {
      $('#inicio_descuento1').prop('disabled', true);
      $('#fin_descuento1').prop('disabled', true);
      $('#name2').prop('disabled', true);
    }

  
  }

  buscarProducto(name: any) {
    if (name != '' && name != null) {
      let data = {
        nombre: name
      }
      this.inventarioService.buscarProducto(data).subscribe((res: any) => {
        //console.log(res);
        if (res.length > 0) {
          this.productos = res;
        }
        else {
          this.translate.get('ProductoNoEncontrado').subscribe(translations => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: translations.title,

              confirmButtonText: translations.confirm,
              showConfirmButton: true,
              timer: 1500
            })
          }
          )
        }
      }, err => console.log(err));
    }
    else {//Esta es una notacion mas larga para mostrar los alertas
      this.translate.get('escribeNombre').subscribe(translations => {
        Swal.fire(
          {
            position: 'center',
            icon: 'error',
            title: translations.title,
            text: translations.text,  
            confirmButtonText: translations.confirm,
            showConfirmButton: true,
            timer: 1500

          })
      })
    }
  }

  listone() {
    this.inventarioService.listone(this.producto).subscribe(res => {
    },
      err => console.log(err));
  }
  modificarProducto(idProducto: any) {
    this.inventarioService.listone(idProducto).subscribe((resProducto: any) => {
      this.producto = resProducto;
      this.categoriaService.listone(this.producto.idCategoria).subscribe((resCategoria: any) => {
        this.categoria = resCategoria;
      }, err => console.log(err));
      this.materialService.listone(this.producto.idMaterial).subscribe((resMaterial: any) => {
        this.material = resMaterial;
      }, err => console.log(err));
      this.marcaService.listone(this.producto.idMarca).subscribe((resMarca: any) => {
        this.marca = resMarca;
      }, err => console.log(err));
      this.openModificarProducto();

    }, err => console.log(err));
  }

  openModificarProducto() {
    $('#modal1').modal('open');
  }
  modificarCategoria(categoria: any, producto?: any) {
    for (const i in this.categorias) {
      if (this.categorias[i].idCategoria == categoria.idCategoria) {
        this.categoria = this.categorias[i];
      }
    }


  }
  modificarMaterial(material: any, producto: any) {
    producto.idMaterial = material.idMaterial;
    for (const i in this.materiales) {
      if (this.materiales[i].idMaterial == material.idMaterial) {
        this.material = this.materiales[i];
      }
    }
  }
  modificarMarca(marca: any, producto: any) {
    producto.idMarca = marca.id;
    for (const i in this.marcas) {
      if (this.marcas[i].idMarca == marca.id) {
        this.marca = this.marcas[i];
      }
    }
  }
  modificarFechaInicio(date: any) {
    this.producto.inicio_descuento = date;
  }

  guardarProducto() {
    this.producto.inicio_descuento = $("#inicio_descuento").val();
    this.producto.fin_descuento = $("#fin_descuento").val();
    if (this.producto != null && this.producto.nombre.length > 0 && this.producto.precio != null && this.producto.stock != null && this.producto.idProducto != null) {
      this.inventarioService.actualizar(this.producto).subscribe(
        res => {
          $('#modal1').modal('close');
          this.translate.get('ProductoActualizado').subscribe(translations => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: translations.title,
              showConfirmButton: true,
              confirmButtonText: translations.confirm,
              timer: 1500
            }).then((result) => {
              this.inventarioService.list().subscribe((resProductos: any) => {
                this.productos = resProductos;

              });
            });
          })
        }, err => console.log(err));
    }
    else//Esta es una notacion mas larga para mostrar los alertas
      this.translate.get(['ErrorActualizar.title', 'ErrorActualizar.confirm']).subscribe(translations => {
        {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: translations['ErrorActualizar.title'],
            showConfirmButton: true,

            timer: 1500
          });
        }
      }

      )

  }
  limpiarFecha() {

    for (const i of this.productos) {
      let fecha = i.inicio_descuento;

    }

  }
  eliminarProducto(idProducto: any) {
    this.translate.get(['eliminarProducto.title', 'eliminarProducto.text', 'eliminarProducto.confirm', 'eliminarProducto.cancel'])
      .subscribe(translations => {
        Swal.fire({
          title: translations['eliminarProducto.title'],
          text: translations['eliminarProducto.text'],
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#ff9800',
          cancelButtonColor: '#d33',
          confirmButtonText: translations['eliminarProducto.confirm'],
          cancelButtonText: translations['eliminarProducto.cancel']
        }).then((result) => {
          if (result.isConfirmed) {
            this.inventarioService.eliminar(idProducto).subscribe(
              res => {
                if (result.isConfirmed) {
                  this.translate.get(['ProductoEliminado.title', 'ProductoEliminado.confirm']).subscribe(translations => {
                    Swal.fire(
                      {
                        position: 'center',
                        icon: 'success',
                        title: translations['ProductoEliminado.title'],
                        confirmButtonText: translations['ProductoEliminado.confirm'],
                        showConfirmButton: true,
                        timer: 1500
                      }
                    )
                      .then((result) => {
                        this.inventarioService.list().subscribe
                          (
                            (resProductos: any) => {
                              this.productos = resProductos;
                            },
                            err => console.log(err)
                          );
                      }
                      );
                  })
                }
              },


            );
          }
        }
        );
      },
      );
  }




  cargandoImagen(event: any, id : any) {
    if (event.target.files && event.target.files[0])
      this.translate.get('AgregarImg').subscribe((translations) =>
        {
      Swal.fire({

      title: translations.title,
      text: translations.text,
      icon: 'warning',
      confirmButtonText: translations.confirm,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33"

      }).then((result) => {
        if (result.isConfirmed) {
          this.imgPrincipal = null;
          console.log(id);
          const files: FileList = event.target.files;
          this.fileToUpload = files.item(0);
          let imgPromise = this.getFileBlob(this.fileToUpload);
          imgPromise.then(blob => {
            this.imagenesService.guardarImagen(id, "productos", blob).pipe(
              switchMap(resGuardar => {
                // La imagen ha sido guardada correctamente, ahora procedemos a actualizar el producto
                this.imgPrincipal = blob;
                return this.inventarioService.updateFoto(id, this.producto);
              }),
              switchMap(resUpdate => {
                // La foto del producto ha sido actualizada correctamente, ahora obtenemos la traducción para mostrar el mensaje
                return this.translate.get('imgActu');
              })
            ).subscribe(
              translation => {
                // Todo fue exitoso, mostramos el mensaje al usuario
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: translation.title,
                  showConfirmButton: false,
                  timer: 1500
                });
                // Considera actualizar la UI aquí en vez de recargar la página, para una mejor experiencia del usuario
                 window.location.reload();
              },
              err => {
                // Manejo de errores para todo el flujo
                console.error(err);
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Error al actualizar la imagen',
                  showConfirmButton: true
                });
              }
            );
          });
        }
      })
      });
  }

getFileBlob(file: File): Promise < string | ArrayBuffer | null > {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      // Aseguramos que reader.result sea manejado adecuadamente
      resolve(reader.result);
    };
    reader.onerror = error => {
      // Manejo del error
      reject(error);
    };
    // Inicia la lectura del contenido del Blob, que será completada con el evento load.
    reader.readAsDataURL(file);
  });
}

return (){

  $('#modal1').modal('close');

}

openCrearProducto() {
  this.producto = new Producto();//limpiar el objeto
  //this.categoria = new Categoria();
  //this.material = new Material();
  //this.marca = new Marca();
  //this.categoria.set(1);
  //this.material.set(1);
  //this.marca.set(1);
  $('#crearProducto').modal('open');
}

crearProducto(){
  this.producto.inicio_descuento = $("#inicio_descuento").val();
  this.producto.fin_descuento = $("#fin_descuento").val();
  this.producto.foto = 0;


  this.inventarioService.crear(this.producto).subscribe(
    res => {
      this.translate.get(['crearProducto.title', 'crearProducto.confirm']).subscribe(translations => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: translations['crearProducto.title'],
          confirmButtonText: translations['crearProducto.confirm'],
          showConfirmButton: true,

        }).then((result) => {
          this.inventarioService.list().subscribe((resProductos: any) => {
            this.productos = resProductos;
          }, err => console.log(err));

        }
        );
      })

      $('#crearProducto').modal('close');

    }, err => console.log(err)
  );


}

}
