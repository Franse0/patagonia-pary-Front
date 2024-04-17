import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private estadoSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  estadoo$: Observable<boolean>; // Declaración sin inicializar

  

  constructor(private aFAuth: AngularFireAuth, private router: Router) {
    this.estadoo$ = this.estadoSubject.asObservable().pipe(shareReplay(1));

    // Restaurar el estado de autenticación desde localStorage al inicio
    const estadoAlmacenado = localStorage.getItem('estado_autenticacion');
    if (estadoAlmacenado) {
      this.estadoSubject.next(JSON.parse(estadoAlmacenado));
    }
  }

  iniciarSesion(loginUsuario: FormGroup) {
    const email = loginUsuario.value.username;
    const password = loginUsuario.value.password;

    this.aFAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        // Actualizar el estado y almacenar en localStorage
        this.estadoSubject.next(true);
        localStorage.setItem('estado_autenticacion', JSON.stringify(true));

        this.router.navigate(['admin']);
      })
      .catch(error => {
        console.log("Error al iniciar sesión", error);
      });
  }
  
  

  logOutService() {
    this.aFAuth.signOut().then(() => {
      // Actualizar el estado y quitar del localStorage
      this.estadoSubject.next(false);
      localStorage.removeItem('estado_autenticacion');
      this.router.navigate(['/login']);
    });
  }

  estadoSaber(): Observable<boolean> {
    return this.estadoo$;
  }

  recuperarEstadoDespuesDeActualizar() {
    const estadoAlmacenado = localStorage.getItem('estado_autenticacion');
    if (estadoAlmacenado) {
      this.estadoSubject.next(JSON.parse(estadoAlmacenado));
    }
  }
}
