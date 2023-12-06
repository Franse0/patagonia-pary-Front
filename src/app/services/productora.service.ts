import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Productora } from '../models/productora';

@Injectable({
  providedIn: 'root'
})
export class ProductoraService {

  
  url: string = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  prodcutoraTodos():Observable<any>{
    return this.http.get(this.url+"/entidades");
  }

  productoraParticular(id:number):Observable<any>{
    return this.http.get(this.url+"/entidad/"+id);
  }

  productoraAgregar(productora:Productora):Observable<Productora>{
    return this.http.post<Productora>(this.url+"/entidad", productora);
  }

  prodcutroaBorrar(id:number):Observable<any>{
    return this.http.delete(this.url+"/entidad/borrar"+id);
  }
}
