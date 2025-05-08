import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { InventarioService } from '../../services/inventario/inventario.service';
import { ReportesService } from '../../services/reportes/reportes.service';
import { ventas } from '../../models/ventas';
import { Estados } from '../../models/estados';
import { intervaloFecha } from '../../models/ventas';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { Pedidos } from '../../models/pedidos';
import { Producto } from '../../models/producto';
import { Usuario } from '../../models/Usuario';
import { IdiomaService } from '../../services/idioma/idioma.service';
import { TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2';
import { error } from 'jquery';
declare var $: any;
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  estados: Estados[] = [];
  ventas: ventas[] = [];
  fechas: intervaloFecha = new intervaloFecha();
  fecha: intervaloFecha = new intervaloFecha();
  productos: Producto[] = [];
  producto: Producto = new Producto();
  cliente: Usuario = new Usuario();
  clientes: Usuario[] = [];
  pedidos: Pedidos[] = [];
  pageSize = 5;
  p = 1;
  idioma = localStorage.getItem('idioma') ?? "es";
  Anterior:any;
  Siguiente:any;
  constructor(private router: Router, private reportesService: ReportesService, private usuarioService: UsuarioService, private pedidosService: PedidosService, private inventarioService: InventarioService, private idiomaService: IdiomaService, private translate: TranslateService) {
    this.idiomaService.currentLanguage.subscribe(
      (msg) => {
        if (msg != ''){
          this.idioma = msg;
        }
      }
    )
   }

  ngOnInit(): void {//Ya jala
    $(document).ready(function () {
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
      }
      );
      $('.modal').modal();
    });
    this.idiomaService.currentLanguage.subscribe(lang => {
      this.translate.use(lang);
      if(lang == 'es'){
        this.Anterior = 'Anterior';
        this.Siguiente = 'Siguiente';
      }
      else{
        this.Anterior = 'Previous';
        this.Siguiente = 'Next';
      }
    });

    this.reportesService.list().subscribe((res: any) => {
      this.ventas = res;
      for (const venta1 of this.ventas) {
        this.reportesService.getEstado(venta1.idEdo).subscribe((res: any) => {
          this.estados.push(res);
        },
          err => console.log(err)
        );
      }
    });
  }
  buscar() {
    //funcion para buscar con un rango de fechas
    var inicio = $("#inicio").val();
    var fin = $("#fin").val();
    if (inicio != '' && fin != '') {
      {
        this.fechas.setDatos(inicio, fin);
        this.reportesService.verVentasPeriodo(this.fechas).subscribe((res: any) => {
          if (res.length > 0)
            this.ventas = res;
          else
            this.translate.get('sinReportes').subscribe((translations) => {
              Swal.fire({
                icon: 'error',
                title: translations.title,
                text: translations.text,
                confirmButtonText: translations.confirm
              })
            })

        },
          err => console.log(err)
        );
      }
    }
    else

      this.translate.get('ponerFechas').subscribe((translations) => {
        Swal.fire({
          icon: 'error',
          title: translations.title,
          text: translations.text,
          confirmButtonText: translations.confirm
        })
      })

  }
  verDetalles(id: number, idCliente: number)//Recibe el id de la compra y lo busca en los pedidos
  {
    //Limpiar los arreglos de datos
    this.productos = [];
    this.cliente = new Usuario();
    this.pedidos = [];
    this.pedidosService.verPedidos(id).subscribe((res: any) => {
      this.pedidos = res;
      //console.log("Pedidos", this.pedidos);
      for (const pedido of this.pedidos) {
        var id = pedido.idProducto;//Obtiene el id del producto
        this.inventarioService.listone(id).subscribe((res: any) => {
          this.productos.push(res);
        }, err => console.log(err));
      }
      this.usuarioService.listone(idCliente).subscribe((res: any) => {
        this.cliente = res;//Obtiene los datos del cliente
        //console.log("Cliente", this.cliente.nombre);
        //console.log("productos", this.productos);
      },
        error => console.log(error)
      )
      $("#modal1").modal('open');
    }
    )

  }


}
