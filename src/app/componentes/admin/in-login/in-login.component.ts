import { ProductoraService } from './../../../services/productora.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Productora } from 'src/app/models/productora';

@Component({
  selector: 'app-in-login',
  templateUrl: './in-login.component.html',
  styleUrls: ['./in-login.component.css','../admin.component.css']
})
export class InLoginComponent {

  formAdmin:FormGroup;

  constructor(private prodcutoraService:ProductoraService, private formBuilder:FormBuilder){
    this.formAdmin=this.formBuilder.group({
    id:["",[]],
    nombre:["",[]],
    apellido:["",[]],
    pretskit:["",[]],
    seudonimo:["",[]],
    img:["",[]],
    soundcloud:["",[]],
    instagram:["",[]],
    spotify:["",[]],
    youtube:["",[]],
    mail:["",[]],
    telefono:["",[]],
    track:["",[]],
    video_yt:["",[]],
    descripcion:["",[]]
    })
  }


  cargarArtista(){
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
    this.prodcutoraService.productoraAgregar(productora).subscribe()
  }
}
