import { Artista } from 'src/app/models/artista';
import { ArtistasService } from './../../../services/artistas.service';
import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GaleriaService } from 'src/app/services/galeria.service';

// import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent {
  artista:any;
  youtubeVideoId!:String; // ID del video de YouTube
  sanitizedYoutubeVideoUrl!: SafeResourceUrl|undefined;
  artistaFotos: string[] = [];

  
  
  constructor(private route: ActivatedRoute, private artistasService: ArtistasService, 
    private viewportScroller: ViewportScroller, private sanitizer: DomSanitizer, private galeriaService:GaleriaService 
    ) {    }

  

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = params['id'];
        this.loadData(id);
      });
    
      // También puedes suscribirte a los cambios en queryParams
      this.route.queryParams.subscribe(queryParams => {
        const idFromQueryParams = queryParams['id'];
        if (idFromQueryParams) {
          this.loadData(idFromQueryParams);
        }
      });
    }
  loadData(id: any): void {
    this.youtubeVideoId = '';
    this.sanitizedYoutubeVideoUrl = undefined;
    this.artistasService.artistaParticular(id).subscribe(data => {
      console.log("datos", data);
      this.artista = data;
      this.procesarFotos();
      this.extractYoutubeVideoId();
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  procesarFotos(): void {
    // Verificar si el campo img_list está presente en el objeto artista
    if (this.artista && this.artista.img_list) {
      // Dividir el string de fotos en un array usando la coma como delimitador
      this.artistaFotos = this.artista.img_list.split(',');
  
      // Ahora tienes un array con las URLs de las fotos del artista
      console.log("soy las fotos", this.artistaFotos);
    }
  }

  extractYoutubeVideoId(): void {
    // Verificar si artista.youtube existe y no es null o undefined
    if (this.artista && this.artista.youtube) {
      // Extraer el ID del video de la URL de YouTube
      const match = this.artista.youtube.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (match && match[1]) {
        this.youtubeVideoId = match[1];
        this.sanitizeYoutubeVideoUrl();
      }
    }
  }

  sanitizeYoutubeVideoUrl(): void {
    if (this.youtubeVideoId) {
      // Construir la URL segura del video de YouTube
      const youtubeUrl = `https://www.youtube.com/embed/${this.youtubeVideoId}`;
      this.sanitizedYoutubeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
    }
  }

  seccionActiva: string = 'bio';
  seccionPredeterminada: string = 'bio';

  mostrarSeccion(seccion: string): void {
    this.seccionActiva = seccion;
  }


  abrirGaleriaDesdePrincipal(index: number): void {
    this.galeriaService.abrirGaleria(this.artistaFotos, index);
  }

}
