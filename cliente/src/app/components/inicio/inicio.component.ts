import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventarioService } from '../../services/inventario/inventario.service';
import { Producto } from '../../models/producto';
declare var $:any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
constructor(private inventarioService:InventarioService,private router:Router){}
productos:Producto[]= [];
producto = new Producto();
ngOnInit(): void {
  $(document).ready(function(){
    $(".dropdown-trigger").dropdown();
    $('.modal').modal();   
      
  });
  this.getProductos();
}
getProductos()
  {
    this.inventarioService.list().subscribe(
      (res:any) => {
        this.productos = res;
        //console.log(res);
      },err => console.log(err)
      );
  }
}
