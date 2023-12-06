import { Component, OnInit } from '@angular/core';
import { Productora } from 'src/app/models/productora';
import { ProductoraService } from 'src/app/services/productora.service';

@Component({
  selector: 'app-productoras',
  templateUrl: './productoras.component.html',
  styleUrls: ['./productoras.component.css']
})
export class ProdcutorasComponent implements OnInit{
  entidades:Productora[];

  constructor(private productoraService:ProductoraService){}

  ngOnInit(): void {
    this.productoraService.prodcutoraTodos().subscribe(data=>{
      console.log("entidades: ",data)
      this.entidades=data
    })
  }
}
