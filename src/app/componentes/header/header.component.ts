import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BuscadorComponent } from '../buscador/buscador.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  enHome:boolean=false;


  constructor(private router:Router, private renderer:Renderer2   ,@Inject(DOCUMENT) private document: Document // Inyecta el servicio Document
    ,){}


  toogleNav(e: Event){
    e.preventDefault()
  const nav = document.getElementById("nav");
  if (nav) {
    nav.classList.toggle('visible');
  }};

  closeNav(e: Event, targetId: string) {
    e.preventDefault();
    const nav = document.getElementById('nav');
    if (nav ) {
      nav.classList.remove('visible');
    }
    this.scrollTo(targetId);
  }


  scrollTo(targetId: string): void {
    if (!this.router.url.includes("/pagina-principal")) {
      this.router.navigate(["/pagina-principal"]).then(() => {
        // Esperar un breve momento antes de desplazar
        setTimeout(() => {
          this.waitForRenderAndScroll(targetId);
        }, 500);
      });
      return;  // Retorna aquí para evitar ejecutar el código de scroll dos veces
    }
  
    this.waitForRenderAndScroll(targetId);
  }
 
 
  waitForRenderAndScroll(targetId: string): void {
    const targetElement = this.document.getElementById(targetId);
  
    if (targetElement) {
      const offset = targetElement.getBoundingClientRect().top;
      const currentYOffset = window.pageYOffset;
      const targetYOffset = currentYOffset + offset - 60;
      
      window.scrollTo({
        top: targetYOffset,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      if (document.readyState !== 'complete') {
        window.addEventListener('load', () => {
          this.waitForRenderAndScroll(targetId);
        });
      }
    }
  }
  
  

  
  isScrolled=false;
  @HostListener('window:scroll',[])
  onScroll(){
    this.isScrolled = window.scrollY>20;
  }

  @ViewChild('buscador') buscador: ElementRef | undefined;

  buscar() {
    // Verifica si el elemento input existe y tiene un valor
    if (this.buscador && this.buscador.nativeElement.value) {
      console.log('estoy buscando', this.buscador.nativeElement.value);
      const busquedaValue = this.buscador.nativeElement.value;
      this.buscador.nativeElement.value=''  
      // Usar el servicio Router para navegar
      this.router.navigate(['/resultados-busqueda'], { queryParams: { categoria: busquedaValue } });
    } else {
      this.buscarValue = !this.buscarValue;
      console.log(this.buscarValue);
    }
  }
  buscarConEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.buscar();
    }
  }
  buscarValue:boolean=false;

}
