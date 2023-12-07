import { Artista } from 'src/app/models/artista';
import { ArtistasService } from './../../../../services/artistas.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-artistas-admin',
  templateUrl: './artistas-admin.component.html',
  styleUrls: ['./artistas-admin.component.css', '../in-login.component.css']
})
export class ArtistasAdminComponent {
  modoEdit:boolean=true;
  formAdmin:FormGroup;
  forEdit:any;

  constructor(private artistaService:ArtistasService, private formBuilder:FormBuilder){
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
    descripcion:["",[]],
    tiktok:["",[]],
    id_edit:["",[]]
    })
  }


  cargarArtista(){
    const artista:Artista={
    id:this.formAdmin.value.id,
    nombre:this.formAdmin.value.nombre,
    apellido:this.formAdmin.value.apellido,
    seudonimo:this.formAdmin.value.seudonimo,
    pretskit:this.formAdmin.value.pretskit,
    img:this.formAdmin.value.img,
    soundcloud:this.formAdmin.value.soundcloud,
    spotify:this.formAdmin.value.spotify,
    instagram:this.formAdmin.value.instagram,
    tiktok:this.formAdmin.value.tiktok,
    youtube:this.formAdmin.value.youtube,
    mail:this.formAdmin.value.mail,
    telefono:this.formAdmin.value.telefono,
    track:this.formAdmin.value.track,
    video_yt:this.formAdmin.value.video_yt,
    descripcion:this.formAdmin.value.descripcion,
    }
    this.artistaService.artistaAgregar(artista).subscribe()
    console.log("artista cargado con exito")
    this.formAdmin.reset()
  }

  getForEdit(){
    const valueId=this.formAdmin.value.id_edit;
    if(valueId===""){
      alert("debes seleccionar el artista a editar");
      return;
    }else{
      this.artistaService.artistaParticular(valueId).subscribe(data=>{
        console.log(data)
        this.forEdit=data
      })
    }
    }
    
}
