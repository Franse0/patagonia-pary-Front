import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistasService } from 'src/app/services/artistas.service';
import { EventosService } from 'src/app/services/eventos.service';
import { LocalesService } from 'src/app/services/locales.service';
import { ProductoraService } from 'src/app/services/productora.service';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent {
  parametroBusqueda:any="";
  busquedaList:any[]=[]
  noResultados:boolean=false
  siResultados:boolean=false
  constructor( private route:ActivatedRoute,
    private artistaService:ArtistasService,
    private eventosService:EventosService,
    private productorasService:ProductoraService,
    private lugaresService:LocalesService,
    private router:Router,
  ){

  }
  ngOnInit(): void {
    this.noResultados = false;
    this.route.queryParams.subscribe(params => {  
      this.parametroBusqueda = params['parametro'];
  
      // Reiniciar la lista de búsqueda
      this.busquedaList = [];
  
      // Realizar todas las búsquedas y agregar los resultados a busquedaList
      this.lugaresService.buscarLocales(this.parametroBusqueda).subscribe(data => {
        this.busquedaList.push(...data); // Agregar resultados a busquedaList
      });
  
      this.productorasService.buscarProductora(this.parametroBusqueda).subscribe(data => {
        this.busquedaList.push(...data); // Agregar resultados a busquedaList
      });
  
      this.eventosService.buscarFiesta(this.parametroBusqueda).subscribe(data => {
        this.busquedaList.push(...data); // Agregar resultados a busquedaList
      });
  
      this.artistaService.buscarArtista(this.parametroBusqueda).subscribe(data => {
        this.busquedaList.push(...data);
  
        // Validar si no hay resultados después de completar todas las suscripciones
        if (!this.busquedaList.length) {
          this.noResultados = true;
          this.siResultados = false;
        }
      });
    });
  }
  

  ira(id:number){
    this.router.navigate(['noticia', id])
  }
}
