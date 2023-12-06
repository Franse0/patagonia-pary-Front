import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Noticia } from 'src/app/models/noticia';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticias-admin',
  templateUrl: './noticias-admin.component.html',
  styleUrls: ['./noticias-admin.component.css' , '../in-login.component.css']
})
export class NoticiasAdminComponent {

  formAdmin:FormGroup

  constructor(private noticiaService:NoticiasService, private formBuilder:FormBuilder){
    this.formAdmin= this.formBuilder.group({
      id:["",[]],
    titulo:["",[]],
    cuerpo:["",[]],
    resumen:["",[]],
    fecha_publi:["",[]],
    url:["",[]],
    img:["",[]],
    })
  }
  cargarNoticia(){
    const noticia:Noticia={
    id:this.formAdmin.value.id,
    titulo:this.formAdmin.value.titulo,
    cuerpo:this.formAdmin.value.cuerpo,
    resumen:this.formAdmin.value.resumen,
    fecha_publi:this.formAdmin.value.fecha_publi,
    url:this.formAdmin.value.url,
    img:this.formAdmin.value.img,

    }
    this.noticiaService.noticiasAgregar(noticia).subscribe()
  }
}
