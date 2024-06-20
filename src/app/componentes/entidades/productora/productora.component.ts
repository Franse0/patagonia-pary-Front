import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';
import { GaleriaService } from 'src/app/services/galeria.service';
import {  ProductoraService } from 'src/app/services/productora.service';

@Component({
  selector: 'app-productora',
  templateUrl: './productora.component.html',
  styleUrls: ['./productora.component.css']
})
export class ProductoraComponent {
  entidad:any;
  youtubeVideoId!:String; // ID del video de YouTube
  sanitizedYoutubeVideoUrl!: SafeResourceUrl|undefined;  
  fechas:any;

  constructor(private entidadService:ProductoraService, private sanitizer:DomSanitizer ,private route:ActivatedRoute,private viewportScroller: ViewportScroller, private galeriaService:GaleriaService, private eventosService:EventosService){}
  productorasFotos: string[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const productoraId= params['id'];
      this.sanitizedYoutubeVideoUrl="";
      this.entidadService.productoraParticular(productoraId).subscribe(data=>{
        this.viewportScroller.scrollToPosition([0, 0]);
        this.entidad=data;
        this.procesarFotos()
        this.fechas=""
        this.nextDates()
        this.extractYoutubeVideoId();
        this.formatLocation(data.ubicacion)
      })
    })
  }

  procesarFotos(): void {
    // Verificar si el campo img_list está presente en el objeto artista
    if (this.entidad && this.entidad.img_list) {
      // Dividir el string de fotos en un array usando la coma como delimitador
      this.productorasFotos = this.entidad.img_list.split(',');
  
      // Ahora tienes un array con las URLs de las fotos del artista
    }
  }

  
  abrirGaleriaDesdePrincipal(index: number): void {
    this.galeriaService.abrirGaleria(this.productorasFotos, index);
  }


  
  extractYoutubeVideoId(): void {
    // Verificar si artista.youtube existe y no es null o undefined
    if (this.entidad && this.entidad.video_yt) {
      // Extraer el ID del video de la URL de YouTube
      const match = this.entidad.video_yt.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
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



  nextDates(){
    if(this.entidad!==null && this.entidad!==undefined){
      this.eventosService.buscarFiesta(this.entidad.nombre.toLowerCase().trim()).subscribe(data=>{
        this.fechas=data
        if(data!==""){
            this.fechas=data
        }
      })

    }
  }


  mostrarMail(mail:String){
    alert("El mail de la productora es: "+mail)
  }
  ubicacionTw:String;
  formatLocation(ubicacion:String) {
    this.ubicacionTw= ubicacion.replace(/\s+/g, '');
}
}
