import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Local } from 'src/app/models/local';
import { LocalesService } from 'src/app/services/locales.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css', ]
})
export class LugaresComponent implements OnInit{
  lugares:Local[];
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
      this.lugares=data.slice(0,4)
      if (this.lugares.length > 0) {
        const iframeCode = this.lugares[0].link_ubi; // Ajusta el nombre según tus datos reales
        this.sanitizeHtmlContent(iframeCode.toString());
      }
    })
  }
  sanitizeHtmlContent(html: string): void {
    this.sanitizedGoogleMapsUrl = this.sanitizer.bypassSecurityTrustHtml(html);
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
        console.log(data)
      }))
}} 

editar(id: number,  event:Event) {
  event.preventDefault()
  console.log(id)
  this.localesService.changeNoticiaId(id);
}

}
