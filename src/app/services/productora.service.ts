import { Productoras } from './../models/productoras';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoraService {

  
  // url: string = "http://localhost:8080/api";
  // url: string = "http://62.72.26.208:8080/api";
  url: string = "https://patagoniapary.ar/api";
  



  constructor(private http:HttpClient) { }

  prodcutoraTodos():Observable<any>{
    return this.http.get(this.url+"/entidades");
  }

  productoraParticular(id:number):Observable<any>{
    return this.http.get(this.url+"/entidad/"+id);
  }

  productoraAgregar(productora:Productoras):Observable<Productoras>{
    return this.http.post<Productoras>(this.url+"/entidad", productora);
  }

  prodcutroaBorrar(id:number):Observable<any>{
    return this.http.delete(this.url+"/entidad/borrar/"+id);
  }

  buscarProductora(parametro:String):Observable<any>{
    return this.http.get<any[]>(`${this.url}/entidad/buscar/${parametro}`)
  }
  private productoraIdSource = new BehaviorSubject<number | null>(null);
  currentProductoraId = this.productoraIdSource.asObservable();
  changeNoticiaId(id: number) {
    this.productoraIdSource.next(id);
  }
}
