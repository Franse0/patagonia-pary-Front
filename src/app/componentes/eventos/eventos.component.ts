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

  constructor(private eventosService:EventosService, private router:Router, private route:ActivatedRoute){

  }
  ngOnInit(): void {
    // Obtener el id de los parámetros de ruta
    // this.route.params.subscribe(params => {
    //   const id = params['id'];
    //   console.log(id);
    // });
  
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log("id que llego",id)
      if (id !== undefined) {
        this.idSelected = +id; // Convertir a número
        // Lógica adicional si es necesario hacer algo cuando hay un evento seleccionado
      }
    });

    if (this.router.url.includes("/eventos-admin")) {
      this.mostrarId = true;
    }

    this.eventosService.fiestasTodos().subscribe(data => {
      this.eventos = data;
      console.log(this.eventos);
    });
  }

  capturarValor(id:number){
 
    this.idSelected=Number(id)
    console.log("funcion que cambia de fiesta:", this.idSelected)
  }
}
