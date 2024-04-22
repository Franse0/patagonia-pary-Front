import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  mail(){
    alert("El contacto es patagoniapary@gmail.com")
  }
  sumarme(event:Event){
    event.preventDefault()
    alert("Estamos trabajando en una interface grafica para volver esto un proceso mas simple. Mientras comunicate con el mail 'patagoniapary@gmail.com' para poder iniciar el proceso por medio de alguien del equipo")
  }
}
