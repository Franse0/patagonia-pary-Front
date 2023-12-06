import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-all-noticias',
  templateUrl: './all-noticias.component.html',
  styleUrls: ['./all-noticias.component.css']
})
export class AllNoticiasComponent  implements OnInit{
  noticias:Noticia[];


  constructor(private noticiaService:NoticiasService,private viewportScroller: ViewportScroller){}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.noticiaService.noticiasTodos().subscribe(data=>{
      this.noticias=data
    },(error)=>{
      console.error('Error al obtener noticias: ', error)
    })
  }
  
}
