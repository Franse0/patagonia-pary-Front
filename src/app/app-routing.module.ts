import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';

const routes: Routes = [
  {path:"pagina-principal", component:PaginaPrincipalComponent},
  {path:"", redirectTo: "pagina-principal", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
