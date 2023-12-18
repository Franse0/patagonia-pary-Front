import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  fecha:any[]=[];
  // reloadComponent: boolean = false; // Nueva variable para controlar la recarga del componente hijo


  constructor(private eventosService:EventosService, private router:Router, private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id !== undefined) {
        this.idSelected =+ id; 
      }
    });

    if (this.router.url.includes("/eventos-admin")) {
      this.mostrarId = true;
    }

    this.eventosService.fiestasTodos().subscribe(data => {
      this.eventos = data;
    });
  }

  capturarValor(id:number){
    this.idSelected=Number(id)
    console.log(this.idSelected)
  }


}
