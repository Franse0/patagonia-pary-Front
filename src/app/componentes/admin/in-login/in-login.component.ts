
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Registro } from 'src/app/models/registro';
import { LoginService } from 'src/app/services/login.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-in-login',
  templateUrl: './in-login.component.html',
  styleUrls: ['./in-login.component.css','../admin.component.css']
})
export class InLoginComponent implements OnInit{
  estado:boolean=false

  registros:Registro[]=[]
  @Output() registrosCambiados = new EventEmitter<number>();
 constructor( private registroService:RegistroService){}

  ngOnInit(): void {
      this.registroService.registrosTodos().subscribe(data =>{
        this.registros=data
        this.actualizarConteoRegistros()
      })
  }
  actualizarConteoRegistros() {
    const conteoActual = this.registros.length;

    localStorage.setItem('conteoRegistros', conteoActual.toString());
  }
  borrar(id:number, event:Event){
    event.preventDefault()
    this.registroService.registroBorrar(id).subscribe(data =>{
      if(window.confirm("seguro que desea borrar este registro")){

        this.registroService.registrosTodos().subscribe(data =>{
          this.registros=data
        })
      }
    })
  }

}
