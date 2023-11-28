import { Artista } from 'src/app/models/artista';
import { ArtistasService } from './../../services/artistas.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.css']
})
export class ArtistasComponent  implements OnInit{
  artistasList:any;
  // selectedArtista: Artista | null = null;
  artistaId:any;
  
  @Output() emitirArtista= new EventEmitter<number>();

  constructor(public artistasService:ArtistasService, private router:Router){}

  ngOnInit() {
    this.artistasService.artistaTodos().subscribe(data=>{
      if(data.length>=8){
        this.artistasList = data.slice(0,8)
      console.log(this.artistasList)
      } else{
      this.artistasList=data;
      console.log(this.artistasList)
      }
    })
  }

  cardGrandeActive =false;
  showInfoArtista = false;

  showArtista(artista: Artista): void {
    if (this.router.url.includes('/artista')) {
      // Estás en la página de artista completo, navega directamente al componente deseado
      this.mostrarDetallesArtista(artista);
    } else {
      // Estás en la página de artistas, muestra la card mediana
      this.artistasService.artistaSeleccionado$.subscribe(selectedArtista => {
        const mismoArtista = selectedArtista?.id === artista.id;
  
        if (!mismoArtista) {
          this.artistasService.actualizarArtistaSeleccionado(artista);
        }
  
        this.cardGrandeActive = !this.cardGrandeActive;
  
        if (this.cardGrandeActive) {
          setTimeout(() => {
            this.showInfoArtista = true;
          }, 100);
        } else {
          this.showInfoArtista = false;
        }
      });
    }
  }
  


mostrarDetallesArtista(artista: Artista): void {
  // Utiliza el servicio de enrutamiento para navegar al componente deseado
  this.router.navigate(['/artista'], { queryParams: { id: artista.id } });}


    
}
