import { Component, OnInit } from '@angular/core';
import { HTMLMediaElement } from '@angular/platform-browser';


@Component({
  selector: 'app-aside-spotify',
  templateUrl: './aside-spotify.component.html',
  styleUrls: ['./aside-spotify.component.css']
})
export class AsideSpotifyComponent implements OnInit{
  
  ngOnInit(){
    const video = document.querySelector('.video-desktop');

    console.log(video)

    // video.load();

    // video.addEventListener('loadedmetadata', () => {
    //   video.muted = true;
    //   video.play();
    // });
  }


}
