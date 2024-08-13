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
        this.entidades=data.reverse()
      })}
    
    if(this.router.url.includes("productoras-admin")){
      this.mostrarId=true;
      this.productoraService.prodcutoraTodos().subscribe(data=>{
        this.entidades=data
      })
    }
    if(this.router.url.includes("pagina-principal")){
      this.productoraService.prodcutoraTodos().subscribe(data=>{
        this.updateDisplayedProductoras(data);
      })
    }

  }
   obtenerProductorasAleatorias(productoras: any[], cantidad: number): any[] {
    const shuffled = productoras.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, cantidad);
  }
  arriba(){
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  irA(id:number){
    this.router.navigate(["/productora", id]) 
  }
  borar(id:number, event:Event){
    event.preventDefault()
    if(window.confirm(`Seguro deseas eliminar el item con el id:${id}`)){
    this.productoraService.prodcutroaBorrar(id).subscribe(data=>
      this.productoraService.prodcutoraTodos().subscribe(data=>{
        this.entidades=data
      }))
}} 

editar(id: number,  event:Event) {
  event.preventDefault()
  this.productoraService.changeNoticiaId(id);
}

updateDisplayedProductoras(data: any[]): void {
  const weekNumber = this.getCurrentWeek();
  const productorasPerWeek = 6;

  // Calcula el índice de inicio en base al número de semana y asegura que sea cíclico
  const startIndex = (weekNumber * productorasPerWeek) % data.length;

  // Asegura que siempre haya suficientes productoras mostradas al hacer que el array sea circular
  const selectedProductoras = [];
  for (let i = 0; i < productorasPerWeek; i++) {
      selectedProductoras.push(data[(startIndex + i) % data.length]);
  }

  // Baraja las productoras seleccionadas para que el orden sea aleatorio
  this.entidades = this.shuffleArray(selectedProductoras);
}

// Función para barajar un array
shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

getCurrentWeek(): number {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (today.valueOf() - firstDayOfYear.valueOf()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

}
