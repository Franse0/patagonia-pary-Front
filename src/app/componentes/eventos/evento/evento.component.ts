import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Evento } from 'src/app/models/evento';
import { ArtistasService } from 'src/app/services/artistas.service';
import { EventosService } from 'src/app/services/eventos.service';
import { mergeMap, catchError } from 'rxjs/operators';
import { switchMap, toArray } from 'rxjs/operators';
import { Params } from '@angular/router';

import { from } from 'rxjs';

import { forkJoin } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProductoraService } from 'src/app/services/productora.service';
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
  fecha:any[]=[]
  sanitizedGoogleMapsUrl: SafeResourceUrl;
  organiza:any[]=[];

  constructor(
    private eventosServcie: EventosService,
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute,
    private artistaService:ArtistasService,
    private sanitizer: DomSanitizer,
    private productoraService:ProductoraService
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
      if (data && data.djs) {
        // Procesar el lineup aquí, por ejemplo:
        this.procesarLineUp(data.djs.toString());
      }if(data.ubicacion_link){    
        this.sanitizeGoogleMapsUrl(data.ubicacion_link.toString());
      }if(data.fecha){
        this.procesarFecha(data.fecha.toString())
      }  if(data.organiza !== null && data.organiza !== undefined){
        this.procesarOrganizacion(data.organiza.toString())
      }

      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventoId'] && !changes['eventoId'].firstChange) {
      if (this.eventoId !== undefined) {
        console.log('Nuevo valor de eventoId:', this.eventoId);

        this.cargarEvento(this.eventoId);
      }
    }
  }

  cargarEvento(id: any): void {
    this.eventosServcie.fiestaParticular(id).subscribe(data => {
      if (data !== null && data !== undefined) {
        if (data.djs) {
          // Procesar el lineup aquí, por ejemplo:
          this.procesarLineUp(data.djs.toString());
        }
        if (data.ubicacion_link !== null && data.ubicacion_link !== undefined) {
          this.sanitizeGoogleMapsUrl(data.ubicacion_link.toString());
        }
        if (data.fecha !== null && data.fecha !== undefined) {
          this.procesarFecha(data.fecha.toString());
        } 
        if(data.organiza !== null && data.organiza !== undefined){
          this.procesarOrganizacion(data.organiza.toString())
        }
      } else {
        // Manejar el caso en el que data es null o undefined
        console.error('Error: data es null o undefined');
      }
      this.viewportScroller.scrollToPosition([0, 0]);
      this.eventoSelected$ = of(data); // Asignar los datos a eventoSelected$
    });
  }
 


  procesarLineUp(djs: string): void {
    // Dividir el string de djs en un array usando la coma como delimitador
    this.lineup = djs.split(',').map(item => item.trim());    
    // Ahora tienes un array con los nombres de los DJs
    this.verificarSiDjEstaCargado(this.lineup)
  }

    
  verificarSiDjEstaCargado(lineup: any[]): void {
    const djsEncontrados: any[] = [];
    const djsNoEncontrados: any[] = [];
  
    if (lineup && lineup.length > 0) {
      const observables = lineup.map(item => this.artistaService.buscarArtista(item));
  
      forkJoin(observables).subscribe(
        resultados => {
          resultados.forEach((data, index) => {
            if (data.length > 0) {
              // Si el DJ está en la base de datos, agregar a djsEncontrados
              djsEncontrados.push(...data);
            } else {
              // Si el DJ no está en la base de datos, agregar a djsNoEncontrados
              djsNoEncontrados.push({ seudonimo: lineup[index], id: null });
            }
          });
          // Asignar tanto a los encontrados como a los no encontrados a enlacesDJs
          this.enlacesDJs = djsEncontrados.concat(djsNoEncontrados);
        },
        error => {
          // Manejar errores (opcional)
          console.error('Error en forkJoin:', error);
        }
      );
    }
  }

  procesarOrganizacion(organiza:String){
    this.productoraService.buscarProductora(organiza).subscribe(data=>{
      this.organiza= data;
      console.log( "organiza desde consola:", this.organiza)
    })
  }

  procesarFecha(fecha:string){
    this.fecha = fecha.split('/').map(item => item.trim());
  }

  sanitizeGoogleMapsUrl(url: string): void {
    this.sanitizedGoogleMapsUrl = this.sanitizer.bypassSecurityTrustHtml(url.toString());
  }
}


 

