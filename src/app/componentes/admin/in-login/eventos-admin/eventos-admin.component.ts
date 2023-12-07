import { FormGroup, FormBuilder } from '@angular/forms';
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
    nombre:["",[]],
    fecha:["",[]],
    djs:["",[]],
    ubicacion:["",[]],
    ubicacion_link:["",[]],
    img:["",[]],
    precio:["",[]],
    descripcion:["",[]],
    organiza:["",[]],
    })
    this.formNumber=this.number.group({
    id_edit:["",[]],
    })
  }
  cargarEvento(){
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
        console.log(data)
        this.forEdit=data
      })
    }
  }
}
