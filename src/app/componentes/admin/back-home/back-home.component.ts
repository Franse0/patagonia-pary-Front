import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-back-home',
  templateUrl: './back-home.component.html',
  styleUrls: ['./back-home.component.css']
})

export class BackHomeComponent implements OnInit{
    hayCambios:Boolean=false
  constructor(private router:Router,private authService:LoginService, private registros:RegistroService){

  }
  settingsOption:boolean=false
  mostrarTodo:Boolean=false;
  ngOnInit(): void {
    if (this.screenWidth <= 700) {
      this.settingsOption =true
      this.settingsState=false
    } 
    if (this.router.url.includes("/admin")) {
      this.mostrarTodo = true;
    }
    
    const conteoAnterior = localStorage.getItem("conteoRegistros");
    if (conteoAnterior !== null) {
      this.registros.registrosTodos().subscribe(data => {
        const conteoActual = data.length;
        if (conteoActual > conteoAnterior) {
      
            this.hayCambios = true;

          localStorage.setItem('conteoRegistros', conteoActual.toString());
        }
        else{
          this.hayCambios=false
        }
      });
    }}


  irA(event:Event){
    event.preventDefault()
    this.hayCambios=false
    this.router.navigate(['/in-login'])
  }
  logOut(){
  this.authService.logOutService()
  this.router.navigate(["/pagina-principal"])
 }
 screenWidth: number = window.innerWidth;
 settingsState:boolean=true;
 settings(){
  if (this.screenWidth >= 700) {
    this.settingsState=true
  } else {

    this.settingsState=!this.settingsState
  }
 }
}
