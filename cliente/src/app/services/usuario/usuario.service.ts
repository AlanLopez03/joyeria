import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { get } from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }
  login(correo: any, password: any) {
    return this.http.get(`${environment.API_URI}/usuarios/login/${correo}/${password}`);
  }
  listone(id : any) {
    return this.http.get(`${environment.API_URI}/usuarios/${id}`);
    }
  crearUsuario(usuario: any) {
    return this.http.post(`${environment.API_URI}/usuarios/crearusuario/`, usuario);
  }
  list(){
    return this.http.get(`${environment.API_URI}/usuarios/`);
  }
  update(usuario: any) {
    return this.http.put(`${environment.API_URI}/usuarios/actualizar/${usuario.idUsuario}`, usuario);
  }
  updateFoto(id: any, usuario: any) {
    return this.http.put(`${environment.API_URI}/usuarios/actualizarFoto/${id}`, usuario);
  }
  getRoles(){
    return this.http.get(`${environment.API_URI}/roles/`);
  }
  getRol(idRol: any){
    return this.http.get(`${environment.API_URI}/roles/${idRol}`);
  }
  getDirecciones(idUsuario: any){
    return this.http.get(`${environment.API_URI}/usuarios/domicilios/${idUsuario}`);
  }
  delete(idUsuario: any){
    return this.http.delete(`${environment.API_URI}/usuarios/eliminar/${idUsuario}`);
  }
  recomendaciones(idUsuario: any){
    return this.http.get(`${environment.API_URI}/usuarios/recomendaciones/${idUsuario}`);
  }
  getDomicilio(idUsuario: any){
    return this.http.get(`${environment.API_URI}/domicilios/${idUsuario}`);
  }
  getDireccion(idDomicilio: any){
    return this.http.get(`${environment.API_URI}/domicilios/direccion/${idDomicilio}`);
  }
  crearDomicilio(domicilio: any){
    return this.http.post(`${environment.API_URI}/domicilios/crearDomicilio/`, domicilio);
  }
  actualizarDomicilio(domicilio: any){
    return this.http.put(`${environment.API_URI}/domicilios/actualizar/${domicilio.idDomicilio}`, domicilio);
  }
  eliminaDireccion(idDom: any){
    return this.http.delete(`${environment.API_URI}/domicilios/eliminar/${idDom}`);
  }
  existeC(correo:any){
    return this.http.post(`${environment.API_URI}/usuarios/existeC`,{"correo":correo})
  }
  actualizarPassword(token:any, password:any){
    return this.http.put(`${environment.API_URI}/usuarios/reestablecerPassword/${token}`,{"password":password});
  }
  verDomicilios(idUsuario: any){
    return this.http.get(`${environment.API_URI}/domicilios/verDomiciliosCLiente/${idUsuario}`);
  }

  verDatosDomicilio(idDomicilio: any){
    return this.http.get(`${environment.API_URI}/domicilios/verDatosDomicilio/${idDomicilio}`);
  }

}
