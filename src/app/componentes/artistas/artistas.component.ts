import { Subscription } from 'rxjs';
import { Artista } from 'src/app/models/artista';
import { ArtistasService } from './../../services/artistas.service';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.css']
})
export class ArtistasComponent  implements OnInit{
  artistasList:any;
  artistasListCel:any;
  artistaId:any;
  mostrarId:boolean=false;
  enlace:boolean=true
  cardMovil:boolean=false;
  
  @Output() emitirArtista= new EventEmitter<number>();
  

  constructor(public artistasService:ArtistasService, private router:Router, private route:ActivatedRoute,private viewportScroller: ViewportScroller){}

 
  
  ngOnInit() {
    const currentRoute = this.router.url;

    if (this.router.url.includes('/all-artistas')) {
      this.enlace = false;
    }

    if (this.router.url.includes('/artistas-admin')) {
      this.mostrarId = true;
    }

    // Suscríbete a los resultados de búsqueda
    this.artistasService.resultadosBusqueda$.subscribe(resultados => {
      if (resultados && resultados.length > 0) {
        this.artistasList = resultados;
        this.artistasListCel = resultados.slice(0, 8);
      } else {
        this.updateArtistList();
      }
    });
  }

  updateArtistList(): void {
    this.artistasService.artistaTodos().subscribe(data => {
      if (this.router.url.includes('/pagina-principal')) {
        this.updateDisplayedArtists(data);
      } else {
        const shuffledData = this.shuffleArray([...data]); // Usa una copia de 'data' para la mezcla
            this.artistasList = shuffledData;
            this.artistasListCel = shuffledData;
      }
    });
  }
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambia los elementos
    }
    return array;
}

  updateDisplayedArtists(data: any[]): void {
    const weekNumber = this.getCurrentWeek();
    const artistsPerWeek = 12;
    const artistsPerWeekCel = 8;

    // Calcula el índice de inicio en base al número de semana y asegura que sea cíclico
    const startIndex = (weekNumber * artistsPerWeek) % data.length;

    // Asegura que siempre haya suficientes artistas mostrados al hacer que el array sea circular
    this.artistasList = [];
    for (let i = 0; i < artistsPerWeek; i++) {
        this.artistasList.push(data[(startIndex + i) % data.length]);
    }
    this.artistasListCel = [];
    for (let i = 0; i < artistsPerWeekCel; i++) {
        this.artistasListCel.push(data[(startIndex + i) % data.length]);
    }

    // Muestra en consola las listas de artistas
    console.log(this.artistasList);
    console.log(this.artistasListCel);

    // Opcional: Configurar la propiedad mostrarCard a false
    this.artistasList.forEach((artista: any) => {
        artista.mostrarCard = false;
    });
}

getCurrentWeek(): number {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today.valueOf() - firstDayOfYear.valueOf()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

  
  cardGrandeActive =false;
  showInfoArtista = false;

  showArtista(artista: Artista): void {
  if (this.router.url.includes('/artistas-admin')) {
      // this.viewportScroller.scrollToPosition([0, 0]);
      alert("estas en artistas")
      return
  }
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
  this.viewportScroller.scrollToPosition([0, 0]);
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

showCard = true;
  private upperScrollLimit = 100;  // Límite superior de scroll para cerrar la card
  private lowerScrollLimit = 1200; // Límite inferior de scroll para cerrar la card
@HostListener('window:scroll', ['$event'])
onScroll(event: any) {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  if(!this.router.url.includes("/all-artistas")){
  // Comprobar si el scroll está fuera de los límites establecidos
  if (scrollPosition > this.lowerScrollLimit || scrollPosition < this.upperScrollLimit) {
    this.showCard = false;
    this.cardGrandeActive = false;
    } else {
    this.showCard = true;
 
  }
}
}

}
