import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

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

  scrollTo(targetId:string){
    const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }};

  
  isScrolled=false;
  @HostListener('window:scroll',[])
  onScroll(){
    this.isScrolled = window.scrollY>20;
  }

}
