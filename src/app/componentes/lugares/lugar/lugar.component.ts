import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ArtistasService } from 'src/app/services/artistas.service';
import { GaleriaService } from 'src/app/services/galeria.service';
import { LocalesService } from 'src/app/services/locales.service';

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styleUrls: ['./lugar.component.css']
})
export class LugarComponent {
  lugar:any;
  lugarFotos: string[] = [];
  youtubeVideoId!:String; // ID del video de YouTube
  sanitizedYoutubeVideoUrl!: SafeResourceUrl|undefined;
  sanitizedGoogleMapsUrl: SafeResourceUrl;
  

  constructor(private route: ActivatedRoute,
     private lugarService: LocalesService, 
    private viewportScroller: ViewportScroller,
     private galeriaService:GaleriaService,
     private sanitizer:DomSanitizer) {}

  ngOnInit(): void {
    // Obtener el id del artista de los parámetros de la URL
    this.route.params.subscribe(params => {
      const idparam = params['id'];
      // Cargar la información del artista utilizando el servicio correspondiente
      this.lugarService.lugarParticular(idparam).subscribe(data => {
        this.lugar=data
        this.procesarFotos()
        this.extractYoutubeVideoId();
        this.sanitizeGoogleMapsUrl(this.lugar.link_ubi.toString())
        this.viewportScroller.scrollToPosition([0, 0]);
      });
    });
  }
  extractYoutubeVideoId(): void {
    // Verificar si artista.youtube existe y no es null o undefined
    if (this.lugar && this.lugar.video) {
      // Extraer el ID del video de la URL de YouTube
      const match = this.lugar.video.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (match && match[1]) {
        this.youtubeVideoId = match[1];
        this.sanitizeYoutubeVideoUrl();
      }

    }
  }

  sanitizeGoogleMapsUrl(url: string): void {
    this.sanitizedGoogleMapsUrl = this.sanitizer.bypassSecurityTrustHtml(url.toString());
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


  procesarFotos(): void {
    // Verificar si el campo img_list está presente en el objeto artista
    if (this.lugar && this.lugar.img_list) {
      // Dividir el string de fotos en un array usando la coma como delimitador
      this.lugarFotos = this.lugar.img_list.split(',');
      // Ahora tienes un array con las URLs de las fotos del artista
    }
  }

  abrirGaleriaDesdePrincipal(index: number): void {
    this.galeriaService.abrirGaleria(this.lugarFotos, index);
  }
}
