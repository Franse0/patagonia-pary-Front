import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-aside-spotify',
  templateUrl: './aside-spotify.component.html',
  styleUrls: ['./aside-spotify.component.css']
})
export class AsideSpotifyComponent implements OnInit{
  fotos: string[] = [
    '/assets/artistas/guus.jpg',
    '/assets/artistas/guus.jpg',
    '/assets/artistas/guus.jpg',
    '/assets/artistas/guus.jpg',
    '/assets/artistas/guus.jpg'
  ];
  ngOnInit(){
    const video = document.querySelector('.video-desktop');

  }


}
