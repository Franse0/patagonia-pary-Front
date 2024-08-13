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
      this.fiestas = this.fiestasEnOrden(data);
      console.log(this.fiestas)
      this.loaded.emit();

    })
  }

  capturarValor(event:Event){
    const valor = (<HTMLImageElement>event.target).id;
    this.idSeleccionado=Number(valor)
  }

   // Función para convertir la fecha de string a objeto Date
   parsearFecha(fecha: string): Date {
    const partes = fecha.split('/');
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; // Restamos 1 porque los meses en JavaScript son 0-11
    const año = 2000 + parseInt(partes[2], 10); // Ajusta esto si trabajas con años diferentes
    return new Date(año, mes, dia);
  }

  // Función para ordenar los eventos por fecha
  fiestasEnOrden(eventos: any[]): any[] {
    return eventos.sort((a, b) => {
      const fechaA = this.parsearFecha(a.fecha);
      const fechaB = this.parsearFecha(b.fecha);
      return fechaA.getTime() - fechaB.getTime();
    });
  }

}
