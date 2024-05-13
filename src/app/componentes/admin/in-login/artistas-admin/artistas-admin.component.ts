import { Artista } from 'src/app/models/artista';
import { ArtistasService } from './../../../../services/artistas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-artistas-admin',
  templateUrl: './artistas-admin.component.html',
  styleUrls: ['./artistas-admin.component.css', '../../admin.component.css']
})
export class ArtistasAdminComponent  implements OnInit{
  formAdmin:FormGroup;
  forEdit:any;
  formNumber:FormGroup;
  artistas:any[]=[]

  constructor(private artistaService:ArtistasService, private formBuilder:FormBuilder, private number:FormBuilder){
    this.formAdmin=this.formBuilder.group({
    id:["",[]],
    nombre:["",[Validators.required]],
    apellido:["",[Validators.required]],
    pretskit:["",[]],
    seudonimo:["",[Validators.required]],
    ubicacion:["",[Validators.required]],
    img:["",[Validators.required]],
    img_list:["",[]],
    soundcloud:["",[]],
    instagram:["",[]],
    spotify:["",[]],
    youtube:["",[]],
    mail:["",[Validators.required]],
    track:["",[]],
    video:["",[]],
    descripcion:["",],
    tiktok:["",[]],
    })
    this.formNumber=this.number.group({
      id_edit:["",[]]
    })
  }
  ngOnInit(): void {
    this.artistaService.artistaTodos().subscribe(data =>{
      this.artistas = data 
    })
  }


  cargarArtista(){
    if (this.formAdmin.invalid) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    const artista:Artista={
    id:this.formAdmin.value.id,
    nombre:this.formAdmin.value.nombre,
    apellido:this.formAdmin.value.apellido,
    seudonimo:this.formAdmin.value.seudonimo,
    pretskit:this.formAdmin.value.pretskit,
    img:this.formAdmin.value.img,
    ubicacion:this.formAdmin.value.ubicacion,
    img_list:this.formAdmin.value.img_list,
    soundcloud:this.formAdmin.value.soundcloud,
    spotify:this.formAdmin.value.spotify,
    instagram:this.formAdmin.value.instagram,
    tiktok:this.formAdmin.value.tiktok,
    youtube:this.formAdmin.value.youtube,
    mail:this.formAdmin.value.mail,
    track:this.formAdmin.value.track,
    video:this.formAdmin.value.video,
    descripcion:this.formAdmin.value.descripcion,
  }
    this.artistaService.artistaAgregar(artista).subscribe()
    this.formAdmin.reset()
  }


  borar(id:number, event:Event){
    event.preventDefault()
    if(window.confirm(`Seguro deseas eliminar el item con el id:${id}`)){
    this.artistaService.artistaBorrar(id).subscribe(data=>
      this.artistaService.artistaTodos().subscribe(data=>{
        this.artistas=data
      }))
}} 
editar(id:number){
    alert('vas a editar el artista con el id ' + id)
  this.artistaService.artistaParticular(id).subscribe(data=>{
    this.forEdit=data;
    this.formAdmin.patchValue({
      id:this.forEdit.id,
      nombre:this.forEdit.nombre,
      apellido:this.forEdit.apellido,
      seudonimo:this.forEdit.seudonimo,
      pretskit:this.forEdit.pretskit,
      img:this.forEdit.img,
      ubicacion:this.forEdit.ubicacion,
      img_list:this.forEdit.img_list,
      soundcloud:this.forEdit.soundcloud,
      spotify:this.forEdit.spotify,
      instagram:this.forEdit.instagram,
      tiktok:this.forEdit.tiktok,
      youtube:this.forEdit.youtube,
      mail:this.forEdit.mail,
      track:this.forEdit.track,
      video:this.forEdit.video,
      descripcion:this.forEdit.descripcion,
    })
  })
}
  

}
