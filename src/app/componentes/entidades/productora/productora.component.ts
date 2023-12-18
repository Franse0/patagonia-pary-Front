import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GaleriaService } from 'src/app/services/galeria.service';
import {  ProductoraService } from 'src/app/services/productora.service';

@Component({
  selector: 'app-productora',
  templateUrl: './productora.component.html',
  styleUrls: ['./productora.component.css']
})
export class ProductoraComponent {
  entidad:any;
  

  constructor(private entidadService:ProductoraService ,private route:ActivatedRoute,private viewportScroller: ViewportScroller, private galeriaService:GaleriaService){}
  productorasFotos: string[] = [];

  ngOnInit(): void {

    this.viewportScroller.scrollToPosition([0, 0]);
    this.route.params.subscribe(params=>{
      const productoraId= params['id'];
      this.entidadService.productoraParticular(productoraId).subscribe(data=>{
        this.entidad=data;
        this.procesarFotos()
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


}
