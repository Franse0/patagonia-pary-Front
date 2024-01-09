import { Artista } from './../models/artista';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ArtistasService {
  // url: string = "http://localhost:8081/api";

  // url: string = "http://62.72.26.208:8080/api";
  url: string = "https://patagoniapary.ar/api";

  // url: string = "http://localhost:8080";

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

  buscarArtista(parametro: string): Observable<any> {
    return this.http.get<any[]>(`${this.url}/artista/buscar/${parametro}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          // Si el artista no se encuentra, lanzamos un error con un mensaje específico
          return throwError('Artista no encontrado');
        }
        // Si hay otro tipo de error, simplemente propagamos el error
        return throwError(error);
      })
    );
  }
  

}
