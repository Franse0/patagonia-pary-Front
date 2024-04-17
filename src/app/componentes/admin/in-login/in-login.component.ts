
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-in-login',
  templateUrl: './in-login.component.html',
  styleUrls: ['./in-login.component.css','../admin.component.css']
})
export class InLoginComponent implements OnInit{
  estado:boolean=false

 constructor(private loginService:LoginService
  ,private router:Router, private afAuth:AngularFireAuth){}

  ngOnInit(): void {
    // this.loginService.estadoSaber()
    // this.afAuth.currentUser.then(user=>{
    //   if(user ){
    //     console.log(user)
    //   }else{
    //     this.router.navigate(["/pagina-principal"])
    //   }
    // });
  }

}
