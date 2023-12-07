import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { Noticia } from 'src/app/models/noticia';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticias-admin',
  templateUrl: './noticias-admin.component.html',
  styleUrls: ['./noticias-admin.component.css' , '../in-login.component.css']
})
export class NoticiasAdminComponent {
  formAdmin:FormGroup
  formNumber:FormGroup
  forEdit:any;

  get secciones() {
    return (this.formAdmin.get('secciones') as FormArray).controls;
  }

  constructor(private noticiaService:NoticiasService, private formBuilder:FormBuilder, private number:FormBuilder){
    this.formAdmin= this.formBuilder.group({
      id: ["", []],
      titulo: ["", []],
      resumen: ["", []],
      // cuerpo:[this.decodeHtml(this.forEdit?.cuerpo), []],  
      cuerpo:["", []],  
      fecha_publi: ["", []],
      url: ["", []],
      img: ["", []],
    })
    this.formNumber=this.number.group({
    id_edit:["",[]],

    })
  }

  decodeHtml(htmlString: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = htmlString;
    return textarea.value;
  }

  cargarNoticia(){
    const noticia:Noticia={
    id:this.formAdmin.value.id,
    titulo:this.formAdmin.value.titulo,
    cuerpo: this.decodeHtml(this.formAdmin.value.cuerpo),
    resumen:this.formAdmin.value.resumen,
    fecha_publi:this.formAdmin.value.fecha_publi,
    url:this.formAdmin.value.url,
    img:this.formAdmin.value.img,

    }
    this.noticiaService.noticiasAgregar(noticia).subscribe();
    console.log("noticia cargada con exito");
    this.formAdmin.reset();
  }

  getForEdit(){
    const valueId = this.formNumber.value.id_edit;
    if(valueId==""){
      console.log("debe elegir un lugar para editar");
      return
    }else{
      this.noticiaService.noticiasParticular(valueId).subscribe(data=>{
        this.forEdit=data;
      })
    }

  }
}
