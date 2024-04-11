import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productoras } from 'src/app/models/productoras';
import { ProductoraService } from 'src/app/services/productora.service';

@Component({
  selector: 'app-productoras',
  templateUrl: './productoras.component.html',
  styleUrls: ['./productoras.component.css']
})
export class ProductorasComponent implements OnInit{
  entidades:Productoras[];
  mostrarId:boolean=false;

  constructor(private productoraService:ProductoraService, private router:Router, private viewportScroller:ViewportScroller){}

  ngOnInit(): void {
    if(this.router.url.includes("all-productoras")){
      this.productoraService.prodcutoraTodos().subscribe(data=>{
        this.entidades=data
      })
    }
    if(this.router.url.includes("productoras-admin")){
      this.mostrarId=true;
      this.productoraService.prodcutoraTodos().subscribe(data=>{
        this.entidades=data
      })
    }
    this.productoraService.prodcutoraTodos().subscribe(data=>{
      this.entidades=data.slice(0, 6).reverse()
    })
  }
  arriba(){
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
