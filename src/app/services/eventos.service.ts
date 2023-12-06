import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artista } from '../models/artista';
import { BehaviorSubject, Observable } from 'rxjs';
import { Evento } from '../models/evento';


@Injectable({
  providedIn: 'root'
})
export class EventosService {

  url: string = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  fiestasTodos():Observable<any>{
    return this.http.get(this.url+"/fiestas");
  }

  fiestaParticular(id:number):Observable<any>{
    return this.http.get(this.url+"/fiesta/"+id);
  }

  fiestaaAgregar(evento:Evento):Observable<Evento>{
    return this.http.post<Evento>(this.url+"/fiesta", evento);
  }

  fiestaBorrar(id:number):Observable<any>{
    return this.http.delete(this.url+"/fiesta/borrar"+id);
  }
}
