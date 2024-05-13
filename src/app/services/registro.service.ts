import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {


  // url: string = "http://localhost:8080/api";
  // url: string = "http://62.72.26.208:8080/api";
  url: string = "https://patagoniapary.ar/api";
  



  constructor(private http:HttpClient) { }

  registrosTodos():Observable<any>{
    return this.http.get(this.url+"/registros");
  }

  registroParticular(id:number):Observable<any>{
    return this.http.get(this.url+"/registro/"+id);
  }

  registroAgregar(registro:Registro):Observable<any>{
    return this.http.post<Registro>(this.url+"/registro", registro);
  }

  registroBorrar(id:number):Observable<any>{
    return this.http.delete(this.url+"/registro/borrar/"+id);
  }

}
