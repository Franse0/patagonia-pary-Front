import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Local } from '../models/local';

@Injectable({
  providedIn: 'root'
})
export class LocalesService {


  url: string = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  lugarTodos():Observable<any>{
    return this.http.get(this.url+"/lugares");
  }

  lugarParticular(id:number):Observable<any>{
    return this.http.get(this.url+"/lugar/"+id);
  }

  lugarAgregar(local:Local):Observable<Local>{
    return this.http.post<Local>(this.url+"/lugar", local);
  }

  lugarBorrar(id:number):Observable<any>{
    return this.http.delete(this.url+"/lugar/borrar/"+id);
  }
  buscarLocales(parametro:String):Observable<any>{
    return this.http.get<any[]>(`${this.url}/lugar/buscar/${parametro}`)
  }
}
