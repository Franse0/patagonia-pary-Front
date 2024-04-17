import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private authService:LoginService, private router:Router){}

  
  logOut(){
  this.authService.logOutService()
  this.router.navigate(["/pagina-principal"])
 }
}
