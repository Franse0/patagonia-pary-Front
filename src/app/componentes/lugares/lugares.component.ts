import { Component, OnInit } from '@angular/core';
import { Local } from 'src/app/models/local';
import { LocalesService } from 'src/app/services/locales.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css', ]
})
export class LugaresComponent implements OnInit{
  lugares:Local[];

  constructor(private localesService:LocalesService){};

  ngOnInit(): void {
    this.localesService.lugarTodos().subscribe(data=>{
      this.lugares=data
      console.log("Lugaes :" ,this.lugares)
    })
  }

  

}
