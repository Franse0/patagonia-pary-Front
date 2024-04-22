import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticia } from 'src/app/models/noticia';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-all-noticias',
  templateUrl: './all-noticias.component.html',
  styleUrls: ['./all-noticias.component.css']
})
export class AllNoticiasComponent  implements OnInit{
  noticias:Noticia[];
  mostrarId:boolean=false;


  constructor(private noticiaService:NoticiasService,private viewportScroller: ViewportScroller, private router:Router){}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    if(this.router.url.includes("/noticias-admin")){
      this.mostrarId=true;
    }
    this.noticiaService.noticiasTodos().subscribe(data=>{
      this.noticias=data.reverse()
    },(error)=>{
      console.error('Error al obtener noticias: ', error)
    })
  }
  editar(id: number,  event:Event) {
    event.preventDefault()
    console.log(id)
    this.noticiaService.changeNoticiaId(id);
  }

   
  borar(id:number, event:Event){
    event.preventDefault()
    if(window.confirm(`Seguro deseas eliminar el item con el id:${id}`)){
    this.noticiaService.noticiasBorrar(id).subscribe(data=>
      this.noticiaService.noticiasTodos().subscribe(data=>{
        this.noticias=data
        console.log(data)
      }))
}} 

irA(id:number){
  if(!this.router.url.includes("/noticias-admin")){
    this.router.navigate(['/evento/', id])
  }
}
  
}
