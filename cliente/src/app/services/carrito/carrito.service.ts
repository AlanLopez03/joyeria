import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http: HttpClient) { }
  listone(id : any) {
    return this.http.get(`${environment.API_URI}/carrito/verCarrito/${id}`);
    }
  insertar(producto: any) {
    return this.http.post(`${environment.API_URI}/carrito/insertarProducto`,producto);
  }
  limpiarCarrito(id : any) {
    return this.http.delete(`${environment.API_URI}/carrito/limpiarCarrito/${id}`);
  }
  eliminarProducto(id : any) {
    return this.http.delete(`${environment.API_URI}/carrito/eliminarProducto/${id}`);
  }
  //search(nombre : any) {
  //  return this.http.get(`${environment.API_URI}/carrito/buscar`,nombre);
  //}
  comprar(id:any,carrito: any) {
    return this.http.post(`${environment.API_URI}/compras/crearCompra/${id}`,carrito);
  }
  listarCompras(id:any) {
    return this.http.get(`${environment.API_URI}/carrito/listarCompras/${id}`);
  }
}
