import { Component } from '@angular/core';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { ReportesService } from '../../services/reportes/reportes.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {

  constructor(private pedidosService:PedidosService, private router:Router) { }
  pedidos:any = [];
  ngOnInit(): void {
    this.pedidosService.list().subscribe(
      res => {
        this.pedidos = res;
        console.log(res);
        if (this.pedidos.length == 0){
          Swal.fire({
            title: 'No hay pedidos',
            text: 'Por el momento, no hay pedidos por mostrar',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          })
        }
      },
      err => console.log(err)
    );
  }

  eliminarPedido(id:any){
    this.pedidosService.delete(id).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      err => console.log(err)
    );
  }

}

