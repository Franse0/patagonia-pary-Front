import { ProductoraService } from 'src/app/services/productora.service';
import { Component } from '@angular/core';
import { ArtistasService } from 'src/app/services/artistas.service';
import { EventosService } from 'src/app/services/eventos.service';
import { LocalesService } from 'src/app/services/locales.service';
import { Artista } from 'src/app/models/artista';
import { Evento } from 'src/app/models/evento';
import { Local } from 'src/app/models/local';
import { Productoras } from 'src/app/models/productoras';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  busquedaForm :FormGroup
  resultadoBusqueda:any[]=[];

  enlacesDJs:any[]=[]

  constructor(
    private artistasService:ArtistasService,
    private productoraService:ProductoraService,
    private fiestaService:EventosService,
    private lugaresService:LocalesService,
    private formbuilder:FormBuilder,
    private router:Router
    ){
      this.busquedaForm= this.formbuilder.group({
        nombreEventoArtista: ['', []],
      })
    }

    irADestino(event:any){
      const tipo = event.tipo;
    const id = event.id;
    console.log("hola", tipo, id)

    switch (tipo) {
      case 'Fiesta':
        this.router.navigate(['/eventos', id]);
        break;
      case 'Productora':
        this.router.navigate(['/productora', id]);
        break;
      case 'Dj':
        this.router.navigate(['/artista', id]);
        break;
      case 'Bar':
        this.router.navigate(['/lugar', id]);
        break;
      default:
        // Manejar otro caso si es necesario
        break;
      }
    }
    

  async buscar() {
    if(this.busquedaForm.value.nombreEventoArtista==0)return;
    this.resultadoBusqueda=[];
    const busqueda = this.busquedaForm.value.nombreEventoArtista;
    console.log("estas buscando", busqueda)
  
    try {
      const dataArtistas = await this.artistasService.buscarArtista(busqueda).toPromise();
      console.log("Soy el resultado de la búsqueda de artistas: ", dataArtistas);
      if (dataArtistas) {
        this.resultadoBusqueda = this.resultadoBusqueda.concat(dataArtistas.map((item:Artista) => ({ ...item, tipo: "Dj" })));
      }
  
      const dataLineUp = await this.fiestaService.fiestasTodos().subscribe(data=>{
        console.log(data.djs)
      })
      const dataFiestas = await this.fiestaService.buscarFiesta(busqueda).toPromise();
      console.log("Soy el resultado de la búsqueda de fiestas: ", dataFiestas);
      if (dataFiestas) {
        this.resultadoBusqueda = this.resultadoBusqueda.concat(dataFiestas.map((item:Evento) => ({ ...item, tipo: "Fiesta" })));
      }
  
      const dataLocales = await this.lugaresService.buscarLocales(busqueda).toPromise();
      console.log("Soy el resultado de la búsqueda de lugares: ", dataLocales);
      if (dataLocales) {
        this.resultadoBusqueda = this.resultadoBusqueda.concat(dataLocales.map((item:Local) => ({ ...item, tipo: "Bar" })));
      }
  
      const dataProductoras = await this.productoraService.buscarProductora(busqueda).toPromise();
      console.log("Soy el resultado de la búsqueda de productoras: ", dataProductoras);
      if (dataProductoras) {
        this.resultadoBusqueda = this.resultadoBusqueda.concat(dataProductoras.map((item:Productoras) => ({ ...item, tipo: "Productora" })));
      }
  
      console.log("Búsqueda final:", this.resultadoBusqueda);
      this.busquedaForm.reset()
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  }


  procesarLineUp(djs: string): void {
    let lineup =[] 
    // Dividir el string de djs en un array usando la coma como delimitador
    lineup = djs.split(',').map(item => item.trim());    
    // Ahora tienes un array con los nombres de los DJs
    this.verificarSiDjEstaCargado(lineup)
  }
  
  verificarSiDjEstaCargado(lineup: any[]): void {
    const djsEncontrados: any[] = [];
    const djsNoEncontrados: any[] = [];
  
    if (lineup && lineup.length > 0) {
      const observables = lineup.map(item => this.artistasService.buscarArtista(item));
  
      forkJoin(observables).subscribe(
        resultados => {
          resultados.forEach((data, index) => {
            if (data.length > 0) {
              // Si el DJ está en la base de datos, agregar a djsEncontrados
              djsEncontrados.push(...data);
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
