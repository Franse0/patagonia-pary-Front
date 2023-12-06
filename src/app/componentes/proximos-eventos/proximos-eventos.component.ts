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

 
  constructor(private eventosService:EventosService){}

  ngOnInit(): void {
    this.eventosService.fiestasTodos().subscribe(data=>{
      if (data.length > 0) {
        this.idSeleccionado = data[0].id;
      }
      if(data.length>4){
        this.fiestas=data.slice(0,4);
      } else{
        this.fiestas=data
      }
    })
  }

  capturarValor(event:Event){
    const valor = (<HTMLImageElement>event.target).id;
    this.idSeleccionado=Number(valor)
  }

  

}
