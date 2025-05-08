import { Component,OnInit } from '@angular/core';
import { ReportesService } from '../../services/reportes/reportes.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Domicilio } from '../../models/domicilio';
import { Router } from '@angular/router';
import { ventas } from '../../models/ventas';
import { Estados } from '../../models/estados';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { InventarioService } from '../../services/inventario/inventario.service';
import { Pedidos } from '../../models/pedidos';
import { Producto } from '../../models/producto';
import { IdiomaService } from '../../services/idioma/idioma.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-usuario-compras',
  templateUrl: './usuario-compras.component.html',
  styleUrl: './usuario-compras.component.css'
})
export class UsuarioComprasComponent implements OnInit{
  pedidos:Pedidos[] = [];
  productos:Producto[] = [];
  compras:ventas[] = [];
  datos = new Domicilio();
  compraUsuario = new ventas();
  estado = new Estados();
  idioma = localStorage.getItem('idioma') ?? 'es';
  constructor(private router: Router, private reportesService: ReportesService,private usuarioService: UsuarioService,private pedidosService: PedidosService,private inventarioService: InventarioService,private idiomaService: IdiomaService,private translate: TranslateService) { 
    var id = localStorage.getItem('idUsuario');
    console.log(id);
    this.idiomaService.currentLanguage.subscribe(
      (msg) => {
        if (msg != ''){
          this.translate.use(msg);
          this.idioma = msg;

        }
        console.log("idioma actual:", this.idioma, " aaaa");
      }
    )
    this.reportesService.verComprasUsuario(id).subscribe((res:any) => 
    {
      if (res.length > 0) 
      {
        this.compras = res;//Ya tenemos todas las compras realizadas por el usuario
        
      }
      else
      this.translate.get('sinCompras').subscribe((translations) => {
      Swal.fire({
        icon: 'error',
        title: translations.title,
        showConfirmButton: true,
        confirmButtonText: translations.confirm,
      });
    });
    });
  }

  abrirAct(id:any){
    
    this.datos = new Domicilio();
    this.reportesService.listOne(id).subscribe((res:any) => {
      this.compraUsuario = res;
      var idDom=this.compraUsuario.idDomicilio;
      this.reportesService.getEstado(res.idEdo).subscribe((resE :any) =>{
        this.estado = resE;
      });
      this.usuarioService.verDatosDomicilio(idDom).subscribe((resD:any) =>{
        if(resD!=false)
          this.datos = resD;
        
      });
      this.pedidos = [];//Limpiamos el arreglo
      this.productos = [];//Limpiamos el arreglo
      console.log(id);
      this.pedidosService.verPedidos(id).subscribe((res:any) => {
        this.pedidos = res;
        if (res!=false)
          for (let i = 0; i < res.length; i++) 
            this.inventarioService.listone(res[i].idProducto).subscribe((resP:any) => {
              this.productos.push(resP);
            });
        
      });
      $('#modalAct').modal('open');
 
      
    })
  }

  cerrarAct() {
    $('#modalAct').modal('close');
  }

  ngOnInit(): void {
    $(document).ready(function(){
      $('.modal').modal();
    });
  }
}
