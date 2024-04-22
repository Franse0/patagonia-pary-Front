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

  editar(id: number,  event:Event) {
    event.preventDefault()
    console.log(id)
    this.eventosService.changeNoticiaId(id);
  }

   
  borar(id:number, event:Event){
    event.preventDefault()
    if(window.confirm(`Seguro deseas eliminar el item con el id:${id}`)){
    this.eventosService.fiestaBorrar(id).subscribe(data=>
      this.eventosService.fiestasTodos().subscribe(data=>{
        this.eventos=data
        console.log(data)
      }))
}} 


irA(id:number){
  if(!this.router.url.includes("/eventos-admin")){
    this.router.navigate(['/eventos/', id])
  }
}
}
