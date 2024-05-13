import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Registro } from 'src/app/models/registro';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-sumarte',
  templateUrl: './sumarte.component.html',
  styleUrls: ['./sumarte.component.css']
})
export class SumarteComponent implements OnInit{
   miFormulario: FormGroup;
  display:Boolean=true
  constructor(private fb: FormBuilder, 
    private router:ActivatedRoute,
    private viewScroller:ViewportScroller,
     private route:Router,
    private registroService:RegistroService) {
    this.miFormulario = this.fb.group({
      id:["",[]],
      email: ['', [Validators.required, Validators.email]]  // Asegúrate de que los corchetes y comas estén correctamente colocados
    });
  }
  url:string="";
  parametroBusqueda:any="";
  mostrarLinkGoogle:boolean=false
  ngOnInit(): void {
    this.viewScroller.scrollToPosition([0,0])
    this.mostrarLinkGoogle=false
    this.router.queryParams.subscribe(params=>{
      this.parametroBusqueda = params['parametro'];
      switch(this.parametroBusqueda){
        case "productora":
          this.url="https://docs.google.com/forms/d/e/1FAIpQLSd07SdubGuwLRTRHSQbElVS88wnZNMLxpOG6A08iIIa8NXX-Q/viewform?usp=sf_link";
          break;
        case "lugar":
          this.url="https://docs.google.com/forms/d/e/1FAIpQLSdTHLpdGFDvCTUMS5dEvwSg3TDm_lgSfjo0V-8eitgmhnQU2w/viewform?usp=sf_link";
          break;
        case "artista":
          this.url="https://docs.google.com/forms/d/e/1FAIpQLSe71ER2il3zAe_bj-wgqFfmrLr6qgpssKdoResrJra08ZtWig/viewform?usp=sf_link";
          break;
          default:
            this.route.navigate(["/pagina-principal"]);
      }
    })
  }

  sumarte:boolean=true
  notificarBoolean:boolean=false

  sumar(){
    this.sumarte=!this.sumarte
    this.mostrarLinkGoogle=false

  }

  notificar(){
    this.mostrarLinkGoogle=false

    this.notificarBoolean=!this.notificarBoolean
  }
  enviar() {
    if (!this.miFormulario.valid) {
      return; // Retorna temprano si el formulario no es válido
    }
  
    const registro:Registro = {
      id:this.miFormulario.value.id,
      email:this.miFormulario.value.email,
      categoria:this.parametroBusqueda
    }
    if (!registro) {
      return; // Retorna temprano si no hay valor
    }
  
    this.registroService.registroAgregar(registro).subscribe({
      next: (res) => {
        // Acciones a realizar con la respuesta
        this.mostrarLinkGoogle = true;
        this.miFormulario.reset(); // Reinicia el formulario tras un éxito
      },
      error: (error) => {
        console.error('Ocurrió un error:', error);
        // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
      }
    });
  }
}
