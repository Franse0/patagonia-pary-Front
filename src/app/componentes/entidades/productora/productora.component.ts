import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productora } from 'src/app/models/productora';
import {  ProductoraService } from 'src/app/services/productora.service';

@Component({
  selector: 'app-productora',
  templateUrl: './productora.component.html',
  styleUrls: ['./productora.component.css']
})
export class ProductoraComponent {
  entidad:Productora;
  

  constructor(private entidadService:ProductoraService ,private route:ActivatedRoute,private viewportScroller: ViewportScroller){}
  ngOnInit(): void {

    this.viewportScroller.scrollToPosition([0, 0]);
    this.route.params.subscribe(params=>{
      const noticiaId= params['id'];
      this.entidadService.productoraParticular(noticiaId).subscribe(data=>{
        console.log(data)
        this.entidad=data;
      })
    })
  }

}
