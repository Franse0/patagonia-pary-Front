import { Artista } from './../models/artista';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistasService {
  url: string = "http://localhost:8080";
  private artistaSource = new BehaviorSubject<Artista | null>(null);
  artistaSeleccionado$ = this.artistaSource.asObservable();

  actualizarArtistaSeleccionado(artista: Artista | null): void {
    this.artistaSource.next(artista);
  }

  constructor(private http:HttpClient) { }

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
    return this.http.delete(this.url+"/artista/borrar"+id);
  }
}
