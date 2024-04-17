import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Local } from 'src/app/models/local';
import { LocalesService } from 'src/app/services/locales.service';

@Component({
  selector: 'app-lugares-admin',
  templateUrl: './lugares-admin.component.html',
  styleUrls: ['./lugares-admin.component.css', '../../admin.component.css']
})
export class LugaresAdminComponent {
  formNumber:FormGroup
  formAdmin:FormGroup
  forEdit:any;

  constructor(private localService:LocalesService, private formBuilder:FormBuilder, private number:FormBuilder){
    this.formAdmin= this.formBuilder.group({
      id:["",[]],
    nombre:["",[Validators.required]],
    descripcion:["",[Validators.required]],
    img1:["",[Validators.required]],
    img2:["",[Validators.required]],
    img_list:["",[]],
    video:["",[]],
    instagram:["",[]],
    ubicacion:["",[]],
    facebook:["",[]],
    telefono:["",[Validators.required]],
    horario:["",[Validators.required]],
    link_ubi:["",[]],
    })

    this.formNumber=this.number.group({
      id_edit:["",[]],
    })
  }



  cargarLocal(){
    if (this.formAdmin.invalid) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    const lugar:Local={
    id:this.formAdmin.value.id,
    nombre:this.formAdmin.value.nombre,
    descripcion:this.formAdmin.value.descripcion,
    img1:this.formAdmin.value.img1,
    img2:this.formAdmin.value.img2,
    video:this.formAdmin.value.video,
    img_list:this.formAdmin.value.img_list,
    instagram:this.formAdmin.value.instagram,
    ubicacion:this.formAdmin.value.ubicacion,
    facebook:this.formAdmin.value.facebook,
    telefono:this.formAdmin.value.telefono,
    horario:this.formAdmin.value.horario,
    link_ubi:this.formAdmin.value.link_ubi,
    }
    this.localService.lugarAgregar(lugar).subscribe()
    this.formAdmin.reset()
    console.log("lugar cargado con exito")
  }

  getForEdit(){
    const valueId = this.formNumber.value.id_edit;
    if(valueId==""){
      console.log("debe elegir un lugar para editar");
      return
    }else{
      this.localService.lugarParticular(valueId).subscribe(data=>{
        this.forEdit=data;
        this.formAdmin.patchValue({
          id:this.forEdit.id,
          nombre:this.forEdit.nombre,
          descripcion:this.forEdit.descripcion,
          img1:this.forEdit.img1,
          img2:this.forEdit.img2,
          img_list:this.forEdit.img_list,
          video:this.forEdit.video,
          instagram:this.forEdit.instagram,
          ubicacion:this.forEdit.ubicacion,
          facebook:this.forEdit.facebook,
          telefono:this.forEdit.telefono,
          horario:this.forEdit.horario,
          link_ubi:this.forEdit.link_ubi,
        })
      })
    }
  }

  deleteMapping(){
    const valueId =this.formNumber.value.id_edit;
    if(window.confirm(`Seguro deseas eliminar el item con el id:${valueId}`))
    this.localService.lugarBorrar(valueId).subscribe()
  }
}
