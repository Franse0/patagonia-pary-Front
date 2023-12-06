import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistasService } from 'src/app/services/artistas.service';
import { LocalesService } from 'src/app/services/locales.service';

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styleUrls: ['./lugar.component.css']
})
export class LugarComponent {
  lugar:any;
  
  constructor(private route: ActivatedRoute, private lugarService: LocalesService, 
    private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    // Obtener el id del artista de los parámetros de la URL
    this.route.params.subscribe(params => {
      console.log(params)
      const idparam = params['id'];
      console.log(idparam)
      // Cargar la información del artista utilizando el servicio correspondiente
      this.lugarService.lugarParticular(idparam).subscribe(data => {
        console.log("datos",data)
        this.lugar=data
        this.viewportScroller.scrollToPosition([0, 0]);
      });
    });
  }


  seccionActiva: string = 'bio';
  seccionPredeterminada: string = 'bio';

  mostrarSeccion(seccion: string): void {
    this.seccionActiva = seccion;
  }



}
