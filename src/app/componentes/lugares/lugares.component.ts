import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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


  constructor(private localesService:LocalesService, private sanitizer:DomSanitizer){};

  ngOnInit(): void {
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
  

}
