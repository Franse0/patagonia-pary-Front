import { Artista } from './../models/artista';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ArtistasService {
  url: string = "http://localhost:8080";
  private artistaSource = new BehaviorSubject<Artista | null>(null);
  artistaSeleccionado$ = this.artistaSource.asObservable();
  private resultadosBusquedaSource = new BehaviorSubject<any[]>([]);
  resultadosBusqueda$ = this.resultadosBusquedaSource.asObservable();

  actualizarArtistaSeleccionado(artista: Artista | null): void {
    this.artistaSource.next(artista);
  }

  constructor(private http:HttpClient, private router:Router) { }

  artistaTodos():Observable<any>{
    return this.http.get(this.url+"/artistas");
  }

  artistaParticular(id:number):Observable<any>{
    return this.http.get(this.url+"/artista/"+id);
  }

  artistaAgregar(artista:Artista):Observable<Artista>{
    return this.http.post<Artista>(this.url+"/artista", artista);
  }

  artistaBorrar(id:number):Observable<any>{
    return this.http.delete(this.url+"/artista/borrar/"+id);
  }

  buscarArtista(parametro:String):Observable<any>{
    return this.http.get<any[]>(`${this.url}/artista/buscar/${parametro}`)
  }
  verificarRegistroArtista(seudonimo:String): Observable<any> {
    return this.http.get<any>(`${this.url}/artista/registrado/${seudonimo}`);
  }
  
}
