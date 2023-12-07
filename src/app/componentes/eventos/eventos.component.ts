import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit{
  idSelected:number;
  mostrarId:boolean=false
  eventos:any;

  constructor(private eventosService:EventosService, private router:Router){

  }
  ngOnInit(): void {
    if(this.router.url.includes("/eventos-admin")){
      this.mostrarId=true;
    }
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
