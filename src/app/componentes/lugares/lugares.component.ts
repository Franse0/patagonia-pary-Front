import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin ,of, Observable } from 'rxjs';
import { Local } from 'src/app/models/local';
import { LocalesService } from 'src/app/services/locales.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css', ]
})
export class LugaresComponent implements OnInit{
  lugares:any[];
  sanitizedGoogleMapsUrl: SafeResourceUrl;
  currentUrl:string;
  mostrarId:boolean=false;


  constructor(private localesService:LocalesService, private sanitizer:DomSanitizer, private router:Router, private route:ActivatedRoute){
    this.currentUrl = this.route.snapshot.url.join("/")
  };

  ngOnInit(): void {
    if(this.router.url.includes("/lugares-admin")){
      this.mostrarId=true;
    }
    this.localesService.lugarTodos().subscribe(data=>{
      this.lugares = data
      this,this.sanitizeLugares(this.lugares)      
    })
  }

  sanitizeLugares(numeros: any[]): void {
    const observables = numeros.map(numero => {
      const ubicacionMap = numero.link_ubi.toString();
      const sanitizedUrl = this.sanitizer.bypassSecurityTrustHtml(ubicacionMap);
      return this.sanitizeUbicacionMap(sanitizedUrl);
    });

    forkJoin(observables).subscribe(sanitizedMaps => {
      this.lugares = numeros.map((lugar, index) => ({
        ...lugar,
        ubicacion_map_sanitized: sanitizedMaps[index]
      }));
    });
  }
  sanitizeUbicacionMap(sanitizedUrl: SafeHtml): Observable<SafeHtml> {
    // Aquí podrías realizar cualquier otra operación de sanitización necesaria
    return of(sanitizedUrl);
  }
  
  irALugar(id:number){
    this.router.navigate(["/lugar", id]) 
  }

  mostrar(telefono:String){
    alert("Teléfono de atención al publico :"+ telefono)
  }

     
  borar(id:number, event:Event){
    event.preventDefault()
    if(window.confirm(`Seguro deseas eliminar el item con el id:${id}`)){
    this.localesService.lugarBorrar(id).subscribe(data=>
      this.localesService.lugarTodos().subscribe(data=>{
        this.lugares=data
      }))
}} 

editar(id: number,  event:Event) {
  event.preventDefault()
  this.localesService.changeNoticiaId(id);
}

}
