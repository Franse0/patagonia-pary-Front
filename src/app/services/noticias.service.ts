import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Noticia } from '../models/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  
  // url: string = "http://localhost:8080/api";
  // url: string = "http://62.72.26.208:8080/api";
  url: string = "https://patagoniapary.ar/api";



  constructor(private http:HttpClient) { }

  noticiasTodos():Observable<any>{
    return this.http.get(this.url+"/noticias");
  }

  noticiasParticular(id:number):Observable<any>{
    return this.http.get(this.url+"/noticia/"+id);
  }

  noticiasAgregar(noticia:Noticia):Observable<Noticia>{
    console.log(noticia)
    return this.http.post<Noticia>(this.url+"/noticia", noticia);
  }

  noticiasBorrar(id:number):Observable<any>{
    return this.http.delete(this.url+"/noticia/borrar/"+id);
  }
  private noticiaIdSource = new BehaviorSubject<number | null>(null);
  currentNoticiaId = this.noticiaIdSource.asObservable();
  changeNoticiaId(id: number) {
    this.noticiaIdSource.next(id);
  }
}
