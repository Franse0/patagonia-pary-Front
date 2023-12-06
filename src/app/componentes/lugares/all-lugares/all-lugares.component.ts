import { Component, OnInit } from '@angular/core';
import { Local } from 'src/app/models/local';
import { LocalesService } from 'src/app/services/locales.service';

@Component({
  selector: 'app-all-lugares',
  templateUrl: './all-lugares.component.html',
  styleUrls: ['./all-lugares.component.css', '../lugares.component.css']
})
export class AllLugaresComponent implements OnInit{
  lugares:Local[];

  constructor(private localService:LocalesService){

  }
  ngOnInit(): void {
    this.localService.lugarTodos().subscribe(data=>{
      this.lugares=data;
      
    })
  }

}
