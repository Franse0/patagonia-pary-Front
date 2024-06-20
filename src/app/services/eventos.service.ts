import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artista } from '../models/artista';
import { BehaviorSubject, Observable } from 'rxjs';
import { Evento } from '../models/evento';


@Injectable({
  providedIn: 'root'
})
export class EventosService {

  // url: string = "http://localhost:8080/api";
  // url: string = "http://62.72.26.208:8080/api";
  url: string = "https://patagoniapary.ar/api";



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
    return this.http.delete(this.url+"/fiesta/borrar/"+id);
  }

  buscarFiesta(parametro:String):Observable<any>{

    return this.http.get<any[]>(`${this.url}/fiesta/buscar/${parametro.toLowerCase()}`)
  }
  private eventoIdSource = new BehaviorSubject<number | null>(null);
  currentNoticiaId = this.eventoIdSource.asObservable();
  changeNoticiaId(id: number) {
    this.eventoIdSource.next(id);
  }
}
