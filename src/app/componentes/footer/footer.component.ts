import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  mail(){
    alert("El contacto es patagoniapary@gmail.com")
  }
  constructor(private router:Router){}

  sumarme(busquedaValue:string,e:Event){
    e.preventDefault()
    this.router.navigate(['/sumate'], { queryParams: { parametro: busquedaValue } });
  }
}
