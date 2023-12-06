import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['../eventos.component.css', './evento.component.css']
})
export class EventoComponent implements OnInit{
  @ViewChild('showEvento') showEventoElement: ElementRef;
  @Input() eventoId:number;
  eventoSelected:any;

  constructor(private eventosServcie:EventosService, private viewportScroller: ViewportScroller, private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      // Cargar la información del artista utilizando el servicio correspondiente
      this.eventosServcie.fiestaParticular(id).subscribe(data => {
        console.log("datos",data)
        this.eventoSelected=data
        this.viewportScroller.scrollToPosition([0, 0]);
      });
    });
    this.eventosServcie.fiestaParticular(this.eventoId).subscribe(data=>{
      this.eventoSelected=data

    })
  }

  
  
  ngOnChanges(changes: SimpleChanges): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    if (changes['eventoId'] && !changes['eventoId'].firstChange) {
      // Verifica si eventoId tiene un valor antes de llamar al servicio
      if (this.eventoId !== undefined) {
        this.OnChange();
      }
    }
  }

  OnChange(){
    this.eventosServcie.fiestaParticular(this.eventoId).subscribe(data=>{
      console.log(data)
      this.eventoSelected=data;
    })
  }




}
