import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  noticias:any;
  constructor(private noticiasService:NoticiasService){}

  ngOnInit(): void {
    this.noticiasService.noticiasTodos().subscribe(data=>{
      if(data.length>4){
        console.log(data)
        this.noticias=data.slice(0,4);
        console.log(this.noticias)
      }
    })
  }


}
