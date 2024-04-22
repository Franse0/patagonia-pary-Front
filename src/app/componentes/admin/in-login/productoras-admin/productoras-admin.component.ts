import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productoras } from 'src/app/models/productoras';
import { ProductoraService } from 'src/app/services/productora.service';

@Component({
  selector: 'app-productoras-admin',
  templateUrl: './productoras-admin.component.html',
  styleUrls: ['./productoras-admin.component.css' , '../../admin.component.css']
})
export class ProductorasAdminComponent implements OnInit{
  forEdit:any;
  formAdmin:FormGroup;
  formNumber:FormGroup;
  constructor(private productoraService:ProductoraService, private formBuilder:FormBuilder, private number:FormBuilder){
    this.formAdmin=this.formBuilder.group({
    id:["",[]],
    nombre:["",[Validators.required]],
    img:["",[Validators.required]],
    img_list:["",[]],
    instagram:["",[]],
    facebook:["",[]],
    tiktok:["",[]],
    mail:["",[Validators.required]],
    youtube:["",[]],
    video_yt:["",[]],
    descripcion:["",[Validators.required]],
    })
    this.formNumber=this.number.group({
      id_edit:["",[]]
    })
  }
  ngOnInit(): void {
    this.productoraService.currentProductoraId.subscribe(id => {
      // Aquí tienes el id, y puedes hacer algo con él.
      console.log("id de edicion", id);
      if(id){
        this.getForEdit(id)
      }
    });
  }

  cargarProductora() {
    if (this.formAdmin.invalid) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    const productora: Productoras = {
      id: this.formAdmin.value.id,
      nombre: this.formAdmin.value.nombre,
      img: this.formAdmin.value.img,
      img_list: this.formAdmin.value.img_list,
      instagram: this.formAdmin.value.instagram,
      facebook: this.formAdmin.value.facebook,
      tiktok: this.formAdmin.value.tiktok,
      mail: this.formAdmin.value.mail,
      youtube: this.formAdmin.value.youtube,
      video_yt: this.formAdmin.value.video_yt,
      descripcion: this.formAdmin.value.descripcion,
    };
  
    this.productoraService.productoraAgregar(productora).subscribe(() => {
      console.log("artista cargado con éxito");
      this.formAdmin.reset();
    });
  }
  getForEdit(id:number){
    
    this.productoraService.productoraParticular(id).subscribe(data=>{
      this.forEdit=data;
      console.log(this.forEdit)
      this.formAdmin.patchValue({
        id:this.forEdit.id,
        nombre:this.forEdit.nombre,
        img:this.forEdit.img,
        img_list:this.forEdit.img_list,
        imgs:this.forEdit.imgs,
        instagram:this.forEdit.instagram,
        facebook:this.forEdit.facebook,
        tiktok:this.forEdit.tiktok,
        mail:this.forEdit.mail,
        youtube:this.forEdit.youtube,
        video_yt:this.forEdit.video_yt,
        descripcion:this.forEdit.descripcion,  
      })   
    })
}

  

  
}
