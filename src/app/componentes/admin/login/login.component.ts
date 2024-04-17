import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../admin.component.css']
})
export class LoginComponent{

  formUser: FormGroup;
  formRegistro: FormGroup;
  loginOrRegister: boolean = true;

  constructor(private formBuilder: FormBuilder, private afAuth: AngularFireAuth, private loginService: LoginService) {
    this.formRegistro = formBuilder.group({
      username_registro: ["", Validators.required],
      password_registro: ["", Validators.required],
      password_again: ["",]
    });

    this.formUser = formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }


  ngOnInit(): void {
      console.log(this.loginService.estadoo$)
  }

  iniciarSesion(formUser: FormGroup) {
    this.loginService.iniciarSesion(formUser);
  }

 

  toggleValor() {
    this.loginOrRegister = !this.loginOrRegister;
  }
}
