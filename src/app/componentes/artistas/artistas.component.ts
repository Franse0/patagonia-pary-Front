import { Subscription } from 'rxjs';
import { Artista } from 'src/app/models/artista';
import { ArtistasService } from './../../services/artistas.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.css']
})
export class ArtistasComponent  implements OnInit{
  artistasList:any;
  artistaId:any;
  mostrarid:boolean=false;
  enlace:boolean=true
  cardMovil:boolean=false;
  
  @Output() emitirArtista= new EventEmitter<number>();

  constructor(public artistasService:ArtistasService, private router:Router, private route:ActivatedRoute){}

  ngOnInit() {
    const currentRoute = this.router.url;
    if(this.router.url.includes('/all-artistas')){
      this.enlace=false;
    }
  
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
            this.artistasList.forEarch((artista:any)=>{
              artista.mostrarCard = false;
            })
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
    }
    console.log(this.artistasList)
  }
  
  
  
  cardGrandeActive =false;
  showInfoArtista = false;

  showArtista(artista: Artista): void {
    let subscription:any;
  if (this.router.url.includes('/artista')) {
      this.mostrarDetallesArtista(artista);
    } else {
      // Estás en la página de artistas, muestra la card mediana
       subscription= this.artistasService.artistaSeleccionado$.subscribe(selectedArtista => {
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
          }, 300);
        } else {
          this.showInfoArtista = false;
        }
        // Desuscribirse después de completar el proceso
        if(subscription){
          subscription.unsubscribe();
        }
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
mostrarCard(artista: any) {
  if(this.router.url.includes("/pagina-principal")){
      // Cierra la tarjeta si ya está abierta
  if (artista.mostrarCard === true) {
    artista.mostrarCard = false;
  } else {
    // Cierra todas las demás tarjetas
    this.artistasList.forEach((item: any) => {
      item.mostrarCard = false;
    });

    // Abre la tarjeta seleccionada
    artista.mostrarCard = true;
  }
}else{
    this.mostrarDetallesArtista(artista)

  }

}

mostrarMail(mail:String){
  alert(mail)
}
    
}
