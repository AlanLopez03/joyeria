import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CorreoService {
  constructor(private http: HttpClient) { }
  enviarCorreoRecuperarContrasenya(body:any)
  {
  return this.http.post(`${environment.API_URI_CORREOS}/enviarCorreoRecuperarContrasenya/`,body);
  }
  enviarCorreoOfertas(productos:any,correo:any)
  {
    const body = { productos, correo };
  return this.http.post(`${environment.API_URI_CORREOS}/enviarCorreoOferta/`,body);
}
  decodificarMail(token:any)
  {
  let dato={"token":token};
  return this.http.post(`${environment.API_URI_CORREOS}/decodificarMail`, dato);
  }
}
