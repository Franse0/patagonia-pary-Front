import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productoras } from 'src/app/models/productoras';
import { ProductoraService } from 'src/app/services/productora.service';

@Component({
  selector: 'app-productoras-admin',
  templateUrl: './productoras-admin.component.html',
  styleUrls: ['./productoras-admin.component.css' , '../in-login.component.css']
})
export class ProductorasAdminComponent {
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
  getForEdit(){
    const valueId=this.formNumber.value.id_edit;
    if(valueId===""){
      alert("debes seleccionar la productora a editar");
      return;
    }else{
      this.productoraService.productoraParticular(valueId).subscribe(data=>{
        try{
          console.log(data)
          this.forEdit=data
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
        }catch(e){
          alert("No se econtro elemento con el id indicado");
        }
      })
    }
    }

    deleteMapping(){
      const valueId =this.formNumber.value.id_edit;
      if(window.confirm(`Seguro deseas eliminar el item con el id:${valueId}`))
      this.productoraService.prodcutroaBorrar(valueId).subscribe()
    this.formNumber.reset();
    this.formAdmin.reset()
    }

}
