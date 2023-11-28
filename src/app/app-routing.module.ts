import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
import { NoticiaComponent } from './componentes/noticias/noticia/noticia.component';
import { ArtistaComponent } from './componentes/artistas/artista/artista.component';

const routes: Routes = [
  {path:"pagina-principal", component:PaginaPrincipalComponent},
  {path:"noticia", component:NoticiaComponent},
  {path:"artista", component:ArtistaComponent},
  {path:"", redirectTo: "pagina-principal", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
