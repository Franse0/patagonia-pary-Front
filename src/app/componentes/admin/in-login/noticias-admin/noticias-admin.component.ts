import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, FormArray, Validators } from '@angular/forms';
import { Noticia } from 'src/app/models/noticia';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticias-admin',
  templateUrl: './noticias-admin.component.html',
  styleUrls: ['./noticias-admin.component.css' , '../../admin.component.css']
})
export class NoticiasAdminComponent {
  formAdmin:FormGroup
  formNumber:FormGroup
  forEdit:any;


  constructor(private noticiaService:NoticiasService, private formBuilder:FormBuilder, private number:FormBuilder){
    this.formAdmin= this.formBuilder.group({
      id: ["", []],
      titulo: ["", [Validators.required]],
      resumen: ["", [Validators.required]],
      cuerpo:["", [Validators.required]],  
      fecha_publi: ["", [Validators.required]],
      url: ["", []],
      img: ["", [Validators.required]],
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
    if (this.formAdmin.invalid) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
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
        try{
          this.forEdit=data;
          this.formAdmin.patchValue({
            id:this.forEdit.id,
            titulo:this.forEdit.titulo,
            cuerpo: this.forEdit.cuerpo,
            resumen:this.forEdit.resumen,
            fecha_publi:this.forEdit.fecha_publi,
            url:this.forEdit.url,
            img:this.forEdit.img,
          })
        } catch(e){
          alert("no se encontro elemento con ese id")
        }
      })
    }
  }
  deleteMapping(){
    const valueId =this.formNumber.value.id_edit;
    if(window.confirm(`Seguro deseas eliminar el item con el id:${valueId}`))
    this.noticiaService.noticiasBorrar(valueId).subscribe()
    this.formAdmin.reset()
    this.formNumber.reset()
  }
}
