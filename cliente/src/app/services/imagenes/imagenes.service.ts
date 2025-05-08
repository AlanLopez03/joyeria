import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private http:HttpClient) { }
  guardarImagen(id:any,nombre:any, src:any){
    return this.http.post(`${environment.API_URL_IMAGENES}/uploadImagen`, {"id": id,"nombre": nombre, //"imagen": imagen 
    "src": src});
    }
}
