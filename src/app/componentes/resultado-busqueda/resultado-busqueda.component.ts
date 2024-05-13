import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistasService } from 'src/app/services/artistas.service';
import { CommonModule } from '@angular/common'; // Importación de CommonModule


@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit{ 
  parametroBusqueda:any="";
  busquedaList:any[]=[]
  noResultados:boolean=false
  siResultados:boolean=false
  constructor( private route:ActivatedRoute,
    private artistaService:ArtistasService,
    
    private router:Router,
  ){

  }
  ngOnInit(): void {
    this.noResultados=false
    this.route.queryParams.subscribe(params => {  
      this.parametroBusqueda = params['parametro'];
      this.artistaService.buscarArtista(this.parametroBusqueda).subscribe(data =>{
        this.busquedaList=data
      })
    })
  }
  

  ira(id:number){
    this.router.navigate(['noticia', id])
  }
}
