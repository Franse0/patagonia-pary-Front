import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { Noticia } from 'src/app/models/noticia';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit{
  noticia:Noticia;
  noticiaAside:Noticia[];
  noticiasMas:Noticia[];

  constructor(private noticiaService:NoticiasService ,private route:ActivatedRoute,private viewportScroller: ViewportScroller){}
  ngOnInit(): void {

    this.getNoticiasAside()
    this.viewportScroller.scrollToPosition([0, 0]);
    this.route.params.subscribe(params=>{
      const noticiaId= params['id'];
      this.noticiaService.noticiasParticular(noticiaId).subscribe(data=>{
        this.noticia=data
        this.noticiaAside = this.limitToMax3(this.noticiaAside.filter(noticia => noticia.id !== data.id));
      })
    })
  }

  getNoticiasAside() {
    this.noticiaService.noticiasTodos().subscribe((data: Noticia[]) => {
      this.noticiasMas=data.slice(0,4)
      // Limitar el número de noticiasAside y asegurarse de que no contenga la noticia actual
      this.noticiaAside = this.limitToMax3(this.shuffleArray(data.filter((noticia: Noticia) => noticia.id !== this.noticia?.id)));
    });
  }
  capturarValor(event:Event){
    this.viewportScroller.scrollToPosition([0, 0]);
    const id = Number((event.target as HTMLElement).id);
    this.noticiaService.noticiasParticular(id).subscribe(data=>{
      this.noticia=data;
      this.getNoticiasAside()
    })
  }
  // Método para limitar a un máximo de 3 elementos
limitToMax3(arr: Noticia[]): Noticia[] {
  return arr.slice(0, 3);
}
 // Método para barajar aleatoriamente un array (Algoritmo de Fisher-Yates)
shuffleArray(arr: any[]): any[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

}
