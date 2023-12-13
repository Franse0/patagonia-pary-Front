import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  constructor() { }
  private galeriaSubject = new BehaviorSubject<{ fotos: string[], index: number } | null>(null);
  private galeriaAbiertaSubject = new BehaviorSubject<boolean>(false);

  galeria$ = this.galeriaSubject.asObservable();
  galeriaAbierta$ = this.galeriaAbiertaSubject.asObservable();

  abrirGaleria(fotos: string[], index: number): void {
    this.galeriaAbiertaSubject.next(true);
    this.galeriaSubject.next({ fotos, index });
  }

  cerrarGaleria(): void {
    this.galeriaAbiertaSubject.next(false);
    this.galeriaSubject.next(null);
  }
}
