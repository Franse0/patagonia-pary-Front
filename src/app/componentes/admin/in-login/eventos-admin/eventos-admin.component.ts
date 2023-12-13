import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos-admin',
  templateUrl: './eventos-admin.component.html',
  styleUrls: ['./eventos-admin.component.css', '../in-login.component.css']
})
export class EventosAdminComponent {
  formAdmin:FormGroup
  forEdit:any;
  formNumber:FormGroup;

  constructor(private eventosService:EventosService, private formBuilder:FormBuilder, private number:FormBuilder){
    this.formAdmin= this.formBuilder.group({
      id:["",[]],
    nombre:["",[Validators.required]],
    fecha:["",[Validators.required]],
    djs:["",[Validators.required]],
    ubicacion:["",[]],
    ubicacion_link:["",[]],
    img:["",[Validators.required]],
    precio:["",[]],
    descripcion:["",[]],
    organiza:["",[Validators.required]],
    })
    this.formNumber=this.number.group({
    id_edit:["",[]],
    })
  }
  cargarEvento(){
    if (this.formAdmin.invalid) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    const evento:Evento={
    id:this.formAdmin.value.id,
    nombre:this.formAdmin.value.nombre,
    djs:this.formAdmin.value.djs,
    fecha:this.formAdmin.value.fecha,
    ubicacion:this.formAdmin.value.ubicacion,
    ubicacion_link:this.formAdmin.value.ubicacion_link,
    img:this.formAdmin.value.img,
    precio:this.formAdmin.value.precio,
    descripcion:this.formAdmin.value.descripcion,
    organiza:this.formAdmin.value.organiza,
    }
    console.log(evento);
    this.eventosService.fiestaaAgregar(evento).subscribe()
    this.formAdmin.reset()
    console.log("evento cargado correctamente")
  }

  getForEdit(){
    const valueId =this.formNumber.value.id_edit;
    console.log(valueId)
    if(valueId==""){
      alert("debes seleccionar el artista a editar");
      return;
    }else{
      this.eventosService.fiestaParticular(valueId).subscribe(data=>{
        try{
          console.log(data)
          this.forEdit=data
          this.formAdmin.patchValue({
            id:this.forEdit.id,
            nombre:this.forEdit.nombre,
            djs:this.forEdit.djs,
            fecha:this.forEdit.fecha,
            ubicacion:this.forEdit.ubicacion,
            ubicacion_link:this.forEdit.ubicacion_link,
            img:this.forEdit.img,
            precio:this.forEdit.precio,
            descripcion:this.forEdit.descripcion,
            organiza:this.forEdit.organiza,
          })
        }catch(e){
          alert("No se encotnro elemento con el id indicado")
        }
      })
    }
  }

  deleteMapping(){
    const valueId =this.formNumber.value.id_edit;
    if(window.confirm(`Seguro deseas eliminar el item con el id:${valueId}`))
    this.eventosService.fiestaBorrar(valueId).subscribe()
    this.formNumber.reset()
  }
}
