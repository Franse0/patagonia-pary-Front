import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Local } from '../models/local';

@Injectable({
  providedIn: 'root'
})
export class LocalesService {


  // url: string = "http://localhost:8080/api";
  // url: string = "http://62.72.26.208:8080/api";
  url: string = "https://patagoniapary.ar/api";



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
  private lugarIdSource = new BehaviorSubject<number | null>(null);
  currentLugarId = this.lugarIdSource.asObservable();
  changeNoticiaId(id: number) {
    this.lugarIdSource.next(id);
  }
}
