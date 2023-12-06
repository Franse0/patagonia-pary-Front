import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit{
  idSelected:number;

  eventos:any;

  constructor(private eventosService:EventosService){

  }
  ngOnInit(): void {
  this.eventosService.fiestasTodos().subscribe(data=>{
    this.eventos=data
    console.log(this.eventos)
  })
  }

  capturarValor(event:Event){
    const valor = (<HTMLImageElement>event.target).id;
    this.idSelected=Number(valor)
    console.log(this.idSelected)
  }
}
