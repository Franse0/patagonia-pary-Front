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
  artistaId:any;
  mostrarid:boolean=false;
  
  @Output() emitirArtista= new EventEmitter<number>();

  constructor(public artistasService:ArtistasService, private router:Router){}

  ngOnInit() {
    const currentRoute = this.router.url;
  
    // Suscríbete a los resultados de búsqueda
    this.artistasService.resultadosBusqueda$.subscribe(resultados => {
      if (resultados && resultados.length > 0) {
        // Si hay resultados de búsqueda, muestra los resultados.
        this.artistasList = resultados;
      } else {
        if (currentRoute === '/') {
          // Si estás en el home y no hay resultados de búsqueda,
          // realiza la solicitud para obtener 8 artistas
          this.artistasService.artistaTodos().subscribe(data => {
            this.artistasList = (data.length >= 8) ? data.slice(0, 8) : data;
          });
        } else {
          // Si estás en cualquier otro router y no hay resultados de búsqueda,
          // realiza la solicitud para obtener todos los artistas
          this.artistasService.artistaTodos().subscribe(data => {
            this.artistasList = data;
          });
        }
      }
    });
  
    if (this.router.url.includes('/artistas-admin')) {
      this.mostrarid = true;
      console.log("hola");
    }
  }
  
  
  
  cardGrandeActive =false;
  showInfoArtista = false;

  showArtista(artista: Artista): void {
  if (this.router.url.includes('/artista')) {
      // Estás en la página de artista completo, navega directamente al componente deseado
      this.mostrarDetallesArtista(artista);
    } else {
      // Estás en la página de artistas, muestra la card mediana
      const subscription = this.artistasService.artistaSeleccionado$.subscribe(selectedArtista => {
        const mismoArtista = selectedArtista?.id === artista.id;
  
        if (!mismoArtista) {
          this.artistasService.actualizarArtistaSeleccionado(artista);
        } else {
          // Si haces clic en el mismo artista, cierra la card mediana
          this.cardGrandeActive = false;
          this.showInfoArtista = false;
        }
  
        this.cardGrandeActive = !this.cardGrandeActive;
  
        if (this.cardGrandeActive) {
          setTimeout(() => {
            this.showInfoArtista = true;
          }, 100);
        } else {
          this.showInfoArtista = false;
        }
  
        // Desuscribirse después de completar el proceso
        subscription.unsubscribe();
      });
    }
  }
  


mostrarDetallesArtista(artista: Artista): void {
  // Utiliza el servicio de enrutamiento para navegar al componente deseado
  this.router.navigate(['/artista'], { queryParams: { id: artista.id } });
}

cerrarCardMediana(){
  this.cardGrandeActive = false;
  this.showInfoArtista = false;
}

mostrarTodosLosArtistas() {
  if(!this.router.url.includes("/all-artistas")){
    this.router.navigate(["/all-artistas"])
    this.artistasService.artistaTodos().subscribe(data => {
      this.artistasList = data;
    });
  }

    this.artistasService.artistaTodos().subscribe(data => {
      this.artistasList = data;
    });
  

}



    
}
