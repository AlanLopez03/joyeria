import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private flagSubjet = new Subject<boolean>();
  flagObservable$ = this.flagSubjet.asObservable();

  constructor(private http: HttpClient) { }
  listone(id : any) {
    return this.http.get(`${environment.API_URI}/productos/${id}`);
    }
  list() {
    return this.http.get(`${environment.API_URI}/productos`);
    }
  actualizar(producto: any) {
    return this.http.put(`${environment.API_URI}/productos/actualizar/${producto.idProducto}`, producto);
  }
  updateFoto(id: any, producto: any) {
    return this.http.put(`${environment.API_URI}/productos/actualizarFoto/${id}`, producto);
  }
  eliminar(id : any) {
    return this.http.delete(`${environment.API_URI}/productos/eliminar/${id}`);
  }
  crear(producto: any) {
    return this.http.post(`${environment.API_URI}/productos/crearProducto`, producto);
  }
  buscarProducto(nombre : any) {
    return this.http.post(`${environment.API_URI}/productos/buscarNombre`,nombre);
  }
  filtrarProductos(id : any) {
    return this.http.get(`${environment.API_URI}/productos/filtrarProductos/${id}`);
  }
  agregarStock(producto: any) {
    return this.http.put(`${environment.API_URI}/productos/agregarStock/${producto.idProducto}`, producto);
  }


  buscarporCategoria(id:any){
    return this.http.get(`${environment.API_URI}/productos//buscarporCategoria/${id}`);
  }

  verOfertas(flag : any) {//Checa si se actualiza el valor de la bandera
    this.flagSubjet.next(flag);
  }
  obtenerOfertas() {
    return this.http.get(`${environment.API_URI}/productos/verOfertas`);
  }

  BuscarProducto(nombre : any, idioma : any) {
    
    return this.http.get(`${environment.API_URI}/productos/buscarProducto/${nombre}/${idioma}`);

  }
}
