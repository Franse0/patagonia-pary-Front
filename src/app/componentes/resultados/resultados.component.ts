import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistasService } from 'src/app/services/artistas.service';
import { EventosService } from 'src/app/services/eventos.service';
import { LocalesService } from 'src/app/services/locales.service';
import { ProductoraService } from 'src/app/services/productora.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit{
  
  parametroBusqueda:any="";
  busquedaListArtistas:any[]=[]
  busquedaListEventos:any[]=[]
  busquedaListLugares:any[]=[]
  busquedaListProductoras:any[]=[]
  noResultados:boolean=false
  siResultados:boolean=false
  constructor( private route:ActivatedRoute,
    private artistaService:ArtistasService,
    private lugaresService:LocalesService,
    private productoraService:ProductoraService,
    private fiestaService:EventosService,
    private router:Router
  ){

  }
  ngOnInit(): void {
    this.noResultados=false
    this.route.queryParams.subscribe(params => {  
      this.parametroBusqueda = params['parametro'];
      this.artistaService.buscarArtista(this.parametroBusqueda).subscribe(data =>{
        this.busquedaListArtistas=data
      })
      this.lugaresService.buscarLocales(this.parametroBusqueda).subscribe(data =>{
        this.busquedaListLugares=data

      })
      this.productoraService.buscarProductora(this.parametroBusqueda).subscribe(data =>{
        this.busquedaListProductoras=data

      })
      this.fiestaService.buscarFiesta(this.parametroBusqueda).subscribe(data =>{
        this.busquedaListEventos=data
      })
    })
  }
  

  @ViewChild('buscador') buscador: ElementRef | undefined;
  buscarValue:boolean=false;

  buscar() {
    let busquedaValue: string | undefined;

    // Intenta obtener el valor de 'buscador'
    if (this.buscador?.nativeElement.value) {
      busquedaValue = this.buscador.nativeElement.value;
      this.buscador.nativeElement.value = '';
    } 
    // Si 'buscador' no tiene valor, intenta obtener el valor de 'buscador2'
    
    // Verifica si se obtuvo algún valor de los buscadores
    if (busquedaValue) {
      // Usar el servicio Router para navegar
      this.router.navigate(['/resultado'], { queryParams: { parametro: busquedaValue } });
      this.buscarValue=false
    } else {
      // Si ninguno de los buscadores tiene valor, cambia el estado de buscarValue
      this.buscarValue = !this.buscarValue;
    }
  }

  buscarConEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.buscar();
    }
  }

}
