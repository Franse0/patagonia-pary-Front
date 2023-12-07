import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Local } from 'src/app/models/local';
import { LocalesService } from 'src/app/services/locales.service';

@Component({
  selector: 'app-lugares-admin',
  templateUrl: './lugares-admin.component.html',
  styleUrls: ['./lugares-admin.component.css', '../in-login.component.css']
})
export class LugaresAdminComponent {
  formNumber:FormGroup
  formAdmin:FormGroup
  forEdit:any;

  constructor(private localService:LocalesService, private formBuilder:FormBuilder, private number:FormBuilder){
    this.formAdmin= this.formBuilder.group({
      id:["",[]],
    nombre:["",[]],
    descripcion:["",[]],
    img1:["",[]],
    img2:["",[]],
    instagram:["",[]],
    ubicacion:["",[]],
    facebook:["",[]],
    telefono:["",[]],
    horario:["",[]],
    link_ubi:["",[]],
    })

    this.formNumber=this.number.group({
      id_edit:["",[]],
    })
  }
  cargarLocal(){
    const lugar:Local={
    id:this.formAdmin.value.id,
    nombre:this.formAdmin.value.nombre,
    descripcion:this.formAdmin.value.descripcion,
    img1:this.formAdmin.value.img1,
    img2:this.formAdmin.value.img2,
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
      })
    }

  }
}
