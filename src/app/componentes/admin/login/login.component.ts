import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
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

  registrarme() {
    const username = this.formRegistro.value.username_registro;
    const password = this.formRegistro.value.password_registro;
    const password_again = this.formRegistro.value.password_again;

    if (password !== password_again) {
      alert("Las contraseñas no coinciden");
    } else {
      this.afAuth.createUserWithEmailAndPassword(username, password)
        .then(() => {
          console.log("Usuario registrado con éxito");
        })
        .catch(error => {
          console.log("Error al registrar usuario", error);
        });
    }
  }

  toggleValor() {
    this.loginOrRegister = !this.loginOrRegister;
  }
}
