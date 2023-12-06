import { Artista } from 'src/app/models/artista';
import { ArtistasService } from './../../../services/artistas.service';
import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

  
  
  constructor(private route: ActivatedRoute, private artistasService: ArtistasService, 
    private viewportScroller: ViewportScroller, private sanitizer: DomSanitizer, 
    ) {    }

  

  ngOnInit(): void {

    

    // Obtener el id del artista de los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.youtubeVideoId = '';
      this.sanitizedYoutubeVideoUrl=undefined;
      // Cargar la información del artista utilizando el servicio correspondiente
      this.artistasService.artistaParticular(id).subscribe(data => {
        console.log("datos",data)
        this.artista=data
        this.extractYoutubeVideoId();
        this.viewportScroller.scrollToPosition([0, 0]);
      });
    });
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




}
