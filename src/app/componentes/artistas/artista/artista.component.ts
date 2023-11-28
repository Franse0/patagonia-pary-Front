import { Artista } from 'src/app/models/artista';
import { ArtistasService } from './../../../services/artistas.service';
import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent {
  artista:any;
  
  constructor(private route: ActivatedRoute, private artistasService: ArtistasService, 
    private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    // Obtener el id del artista de los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      // Cargar la información del artista utilizando el servicio correspondiente
      this.artistasService.artistaParticular(id).subscribe(data => {
        console.log("datos",data)
        this.artista=data
        this.viewportScroller.scrollToPosition([0, 0]);
      });
    });
  }

  


}
