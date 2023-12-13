import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Evento } from 'src/app/models/evento';
import { ArtistasService } from 'src/app/services/artistas.service';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['../eventos.component.css', './evento.component.css']
})
export class EventoComponent implements OnInit {
  @ViewChild('showEvento') showEventoElement: ElementRef;
  @Input() eventoId: number;
  eventoSelected$: Observable<Evento>;
  lineup:any[]=[]
  enlacesDJs:any[]=[]

  constructor(
    private eventosServcie: EventosService,
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute,
    private artistaService:ArtistasService
  ) {}

  ngOnInit(): void {
    this.eventoSelected$ = this.route.queryParams.pipe(
      switchMap(params => {
        const id = params['id'];
        if (id !== undefined) {
          return this.eventosServcie.fiestaParticular(id);
        } else if (this.eventoId !== undefined) {
          return this.eventosServcie.fiestaParticular(this.eventoId);
        } else {
          // Si no hay id ni eventoId, devolvemos un observable vacío
          return of(null);
        }
      })
    );

    this.eventoSelected$.subscribe(data => {
      console.log("datos", data);
      if (data && data.djs) {
        // Procesar el lineup aquí, por ejemplo:
        this.procesarLineUp(data.djs.toString());
      }

      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    if (changes['eventoId'] && !changes['eventoId'].firstChange) {
      if (this.eventoId !== undefined) {
        this.OnChange();
      }
    }
  }

  OnChange() {
    this.eventoSelected$ = this.eventosServcie.fiestaParticular(this.eventoId);
  }

  procesarLineUp(djs: string): void {
    this.lineup = djs.split(',');
    this.enlacesDJs = [];  // Inicializa el array antes de agregar enlaces
  
    this.lineup.forEach(item => {
      this.artistaService.verificarRegistroArtista(item).subscribe(
        id => {
          if (id > 0) {
            const seudonimo = item;  // Obtén el seudónimo
            const enlace = this.generarEnlace(id);  // Genera el enlace
            this.enlacesDJs.push({ seudonimo, enlace });  // Agrega a la lista
          }
        },
        error => {
          console.error("Error al verificar el registro del DJ:", error);
        }
      );
    });
  }
  generarEnlace(id: number): string {
    return `/artista/${id}`;
  }

}
