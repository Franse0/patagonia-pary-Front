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
  
}
