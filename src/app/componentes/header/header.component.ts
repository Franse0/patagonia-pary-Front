import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  enHome:boolean=false;


  constructor(private router:Router, private renderer:Renderer2   ,@Inject(DOCUMENT) private document: Document // Inyecta el servicio Document
  ){}


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
        }, 100);
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


}
