import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http:HttpClient ) { }
  list(){
    return this.http.get(`${environment.API_URI}/materiales/`);
  }
  listone(id:any){
    return this.http.get(`${environment.API_URI}/materiales/${id}`);
  }
}
