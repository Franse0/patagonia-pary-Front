import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Local } from 'src/app/models/local';
import { LocalesService } from 'src/app/services/locales.service';

@Component({
  selector: 'app-all-lugares',
  templateUrl: './all-lugares.component.html',
  styleUrls: ['./all-lugares.component.css', '../lugares.component.css']
})
export class AllLugaresComponent implements OnInit{
  lugares:Local[];
  mostrarId=false;

  constructor(private localService:LocalesService, private router:Router, private viewportScroller:ViewportScroller){

  }
  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0,0])
    if(this.router.url.includes("/lugares-admin")){
      this.mostrarId=true
    }
    this.localService.lugarTodos().subscribe(data=>{
      this.lugares=data;
      
    })
  }

}
