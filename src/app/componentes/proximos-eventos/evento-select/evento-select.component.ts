import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, take } from 'rxjs';
import { Evento } from 'src/app/models/evento';
import { ArtistasService } from 'src/app/services/artistas.service';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-evento-select',
  templateUrl: './evento-select.component.html',
  styleUrls: ['./evento-select.component.css']
})
export class EventoSelectComponent implements OnInit{
  @Input() eventoId:number ;
  eventoSelected:any;
  eventos:any[];

  constructor(private eventoSerivce:EventosService, private router:Router,
    private artistaService:ArtistasService
  ){}

  async ngOnInit(): Promise<void> {
    this.eventoSerivce.fiestasTodos().subscribe(data=>{
      this.eventos=data;
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
      this.enlacesDJs=[]
      this.procesarLineUp(data.djs)
    });
  }

  mostrarDetalle(id:number){
    this.router.navigate(['/eventos', id]);;
  }
  
  
  lineup:any[]=[]
  enlacesDJs:any[]=[]

  procesarLineUp(djs: string): void {
    console.log(djs)
    // Dividir el string de djs en un array usando la coma como delimitador
    this.lineup = djs.split(',').map(item => item.trim());    
    // Ahora tienes un array con los nombres de los DJs
    this.verificarSiDjEstaCargado(this.lineup)
  }

    
  verificarSiDjEstaCargado(lineup: any[]): void {
    const djsEncontrados: any[] = [];
    const djsNoEncontrados: any[] = [];
  
    if (lineup && lineup.length > 0) {
      const observables = lineup.map(item => this.artistaService.buscarArtista(item));
  
      forkJoin(observables).subscribe(
        resultados => {
          resultados.forEach((data, index) => {
            if (data.length > 0) {
              const nombreMinuscula = lineup[index].toLowerCase();
              const djEncontrado = data.find((dj:any) => dj.seudonimo.toLowerCase() === nombreMinuscula);
              if(!djEncontrado){
              djsNoEncontrados.push({ seudonimo: lineup[index], id: null });
              }
              // Si el DJ está en la base de datos, agregar a djsEncontrados
              if(djEncontrado){
                djsEncontrados.push(...data);
              }
            } else {
              // Si el DJ no está en la base de datos, agregar a djsNoEncontrados
              djsNoEncontrados.push({ seudonimo: lineup[index], id: null });
            }
          });
          // Asignar tanto a los encontrados como a los no encontrados a enlacesDJs
          this.enlacesDJs = djsEncontrados.concat(djsNoEncontrados);

        },
        error => {
          // Manejar errores (opcional)
          console.error('Error en forkJoin:', error);
        }
      );
    }
  }

}
