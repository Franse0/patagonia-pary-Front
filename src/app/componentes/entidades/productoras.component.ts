import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productora } from 'src/app/models/productora';
import { ProductoraService } from 'src/app/services/productora.service';

@Component({
  selector: 'app-productoras',
  templateUrl: './productoras.component.html',
  styleUrls: ['./productoras.component.css']
})
export class ProdcutorasComponent implements OnInit{
  entidades:Productora[];
  mostrarId:boolean=false;

  constructor(private productoraService:ProductoraService, private router:Router){}

  ngOnInit(): void {
    if(this.router.url.includes("productoras-admin")){
      this.mostrarId=true;
    }
    this.productoraService.prodcutoraTodos().subscribe(data=>{
      console.log("entidades: ",data)
      this.entidades=data.slice(0,3)
    })
  }
}
