import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit{
  constructor(private scroller:ViewportScroller){}
  loading: boolean = true;
  eventosCargados: boolean = false;
  artistasCargados: boolean = false;
  productorasCargadas: boolean = false;
  noticiasCargadas: boolean = false;
  lugaresCargados: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      
      this.scroller.scrollToPosition([0,0])
    }, 500);
  }

  handleLoaded() {
    // Verificar si todos los componentes han cargado sus datos
    if ( this.eventosCargados && this.artistasCargados ) {
      // Si todos los componentes han cargado sus datos, ocultar el spinner
       this.loading = false;
    }
  }
  handleArtistasLoaded() {
    this.artistasCargados = true;
    this.handleLoaded();
  }
  
  handleEventosLoaded() {
    this.eventosCargados = true;
    this.handleLoaded();
  }
  

}
