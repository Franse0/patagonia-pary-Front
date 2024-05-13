import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/services/eventos.service';

declare var MercadoPago: any;

@Component({
  selector: 'app-proximos-eventos',
  templateUrl: './proximos-eventos.component.html',
  styleUrls: ['./proximos-eventos.component.css']
})
export class ProximosEventosComponent  implements OnInit{
  fiestas:any;
  idSeleccionado:number;
  selectedFiesta:any;
  @Output() loaded: EventEmitter<void> = new EventEmitter<void>()

 
  constructor(private eventosService:EventosService){}

  ngOnInit(): void {
    this.eventosService.fiestasTodos().subscribe(data=>{
      this.fiestas=data
      this.loaded.emit();

    })
  }

  capturarValor(event:Event){
    const valor = (<HTMLImageElement>event.target).id;
    this.idSeleccionado=Number(valor)
  }

  

}
