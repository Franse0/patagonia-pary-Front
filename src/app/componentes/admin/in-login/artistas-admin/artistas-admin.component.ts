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
  formAdmin:FormGroup;

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
    descripcion:["",[]]
    })
  }


  cargarArtista(){
    const artista:Artista={
    id:this.formAdmin.value.id,
    nombre:this.formAdmin.value.nombre,
    apellido:this.formAdmin.value.apellido,
    pretskit:this.formAdmin.value.pretskit,
    seudonimo:this.formAdmin.value.seudonimo,
    img:this.formAdmin.value.img,
    soundcloud:this.formAdmin.value.soundcloud,
    instagram:this.formAdmin.value.instagram,
    spotify:this.formAdmin.value.spotify,
    youtube:this.formAdmin.value.youtube,
    mail:this.formAdmin.value.mail,
    telefono:this.formAdmin.value.telefono,
    track:this.formAdmin.value.track,
    video_yt:this.formAdmin.value.video_yt,
    descripcion:this.formAdmin.value.descripcion,
    }
    this.artistaService.artistaAgregar(artista).subscribe()
  }
}
