import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventarioService } from '../../services/inventario/inventario.service';
import { environment } from '../../environments/environment';
import { Producto } from '../../models/producto';
import { MaterialService } from '../../services/material/material.service';
import { CarritoService } from '../../services/carrito/carrito.service';
import { addProducto } from '../../models/carrito';

import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrl: './ver-producto.component.css'
})
export class VerProductoComponent implements OnInit {
  id:any ;
  cantidad: number = 1;
  producto:Producto = new Producto();
  liga: string = environment.API_URL_IMAGENES + '/productos';
  material:any
  inserta = new addProducto();
  constructor(private route: ActivatedRoute,private inventarioService: InventarioService,private materialService: MaterialService,private carritoService: CarritoService,
  private translateService: TranslateService) {}  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.inventarioService.listone(this.id).subscribe((data: any) => {
      this.producto = data;
    });
    this.materialService.listone(this.producto.idMaterial).subscribe((data: any) => {
      this.material = data.nombre;
    });

  }
 aumentarCantidad() {
    if (this.cantidad < this.producto.stock) {
      this.cantidad++;
    }
  }

  disminuirCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  agregarProducto(id: any) {//Recibe el id del producto

      var a = localStorage.getItem('idUsuario') ?? '1';
      
      this.inserta.setAtributos(id, parseInt(a), this.cantidad);//Se crea un objeto de tipo addProducto con el id del producto, el id del cliente y la cantidad
      if(this.producto.stock>0){
        this.carritoService.insertar(this.inserta).subscribe((data: any) => {

          Swal.fire({
            title: this.translateService.instant('Producto agregado'),
            icon: 'success',
            confirmButtonText: this.translateService.instant('Aceptar')
          });
        }, (error: any) => {
          console.error("Error al agregar producto al carrito:", error);
          Swal.fire({
            title: this.translateService.instant('producto.error'),
            text: this.translateService.instant('producto.intentar'),
            icon: 'error',
            confirmButtonText: this.translateService.instant('Aceptar')
          });
        });
      }
  }}
