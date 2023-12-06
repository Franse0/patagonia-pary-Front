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

  constructor(private eventosService:EventosService, private formBuilder:FormBuilder){
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
    this.eventosService.fiestaaAgregar(evento).subscribe()
  }
}
