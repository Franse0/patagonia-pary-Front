import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Productora } from 'src/app/models/productora';
import { ProductoraService } from 'src/app/services/productora.service';

@Component({
  selector: 'app-productoras-admin',
  templateUrl: './productoras-admin.component.html',
  styleUrls: ['./productoras-admin.component.css' , '../in-login.component.css']
})
export class ProductorasAdminComponent {
  forEdit:any;
  formAdmin:FormGroup;
  constructor(private productoraService:ProductoraService, private formBuilder:FormBuilder){
    this.formAdmin=this.formBuilder.group({
    id:["",[]],
    nombre:["",[]],
    img:["",[]],
    instagram:["",[]],
    facebook:["",[]],
    tiktok:["",[]],
    mail:["",[]],
    telefono:["",[]],
    youtube:["",[]],
    video_yt:["",[]],
    descripcion:["",[]],
    id_edit:["",[]]
    })
  }

  cargarProductora(){
    const productora:Productora={
      id:this.formAdmin.value.id,
      nombre:this.formAdmin.value.nombre,
      img:this.formAdmin.value.img,
      instagram:this.formAdmin.value.instagram,
      facebook:this.formAdmin.value.facebook,
      tiktok:this.formAdmin.value.tiktok,
      mail:this.formAdmin.value.mail,
      telefono:this.formAdmin.value.telefono,
      youtube:this.formAdmin.value.youtube,
      video_yt:this.formAdmin.value.video_yt,
      descripcion:this.formAdmin.value.descripcion,
      }
      this.productoraService.productoraAgregar(productora).subscribe()
      console.log("artista cargado con exito")
      this.formAdmin.reset()
  }
  getForEdit(){
    const valueId=this.formAdmin.value.id_edit;
    if(valueId===""){
      alert("debes seleccionar la productora a editar");
      return;
    }else{
      this.productoraService.productoraParticular(valueId).subscribe(data=>{
        console.log(data)
        this.forEdit=data
      })
    }
    }

}
