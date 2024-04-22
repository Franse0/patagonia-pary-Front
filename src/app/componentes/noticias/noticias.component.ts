import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  noticias:any;
  constructor(private noticiasService:NoticiasService, private router:Router){}

  ngOnInit(): void {
    this.noticiasService.noticiasTodos().subscribe(data=>{
    
        this.noticias=data.slice(-6).reverse();
      
    })
  }

  
}
