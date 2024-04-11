import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-evento-select',
  templateUrl: './evento-select.component.html',
  styleUrls: ['./evento-select.component.css']
})
export class EventoSelectComponent implements OnInit{
  @Input() eventoId:number ;
  eventoSelected:any;
  selectedFiesta:any;
  eventos:any[];

  constructor(private eventoSerivce:EventosService, private router:Router){}

  async ngOnInit(): Promise<void> {
    this.eventoSerivce.fiestasTodos().subscribe(data=>{
      this.eventos=data;
    })
    this.eventoSerivce.fiestaParticular(this.eventoId).subscribe(data=>{
      this.eventoSelected=data
    })
    await this.cargarEvento();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si ha cambiado el valor de eventoId
    if (changes['eventoId'] && !changes['eventoId'].firstChange) {
      // Realiza la lógica que deseas ejecutar cuando hay cambios en eventoId
      this.actualizarEvento(this.eventoId);
    }
  }
  private async cargarEvento(): Promise<void> {
    if (this.eventoId !== undefined) {
      const data = await this.eventoSerivce.fiestaParticular(this.eventoId).toPromise();
      this.eventoSelected = data.slice(0, 1);
    }
  }
  
  private actualizarEvento(id:any) {  
    this.eventoSerivce.fiestaParticular(id)
    .pipe(
      take(1)
    )
    .subscribe(data => {
      this.eventoSelected = [data];
    });
  }

  mostrarDetalle(id:number){
    this.router.navigate(['/eventos', id]);;
  }
  
  

}
