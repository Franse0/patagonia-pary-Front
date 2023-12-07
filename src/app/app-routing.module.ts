import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
import { NoticiaComponent } from './componentes/noticias/noticia/noticia.component';
import { ArtistaComponent } from './componentes/artistas/artista/artista.component';
import { AllNoticiasComponent } from './componentes/noticias/all-noticias/all-noticias.component';
import { AllArtistasComponent } from './componentes/artistas/all-artistas/all-artistas.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { EventoComponent } from './componentes/eventos/evento/evento.component';
import { AllLugaresComponent } from './componentes/lugares/all-lugares/all-lugares.component';
import { LugarComponent } from './componentes/lugares/lugar/lugar.component';
import { ProductoraComponent } from './componentes/entidades/productora/productora.component';
import { AsideSpotifyComponent } from './componentes/aside-spotify/aside-spotify.component';
import { ArtistasAdminComponent } from './componentes/admin/in-login/artistas-admin/artistas-admin.component';
import { LugaresAdminComponent } from './componentes/admin/in-login/lugares-admin/lugares-admin.component';
import { EventosAdminComponent } from './componentes/admin/in-login/eventos-admin/eventos-admin.component';
import { NoticiasAdminComponent } from './componentes/admin/in-login/noticias-admin/noticias-admin.component';
import { ProductorasAdminComponent } from './componentes/admin/in-login/productoras-admin/productoras-admin.component';
import { LoginComponent } from './componentes/admin/login/login.component';
import { InLoginComponent } from './componentes/admin/in-login/in-login.component';
import { AdminComponent } from './componentes/admin/admin.component';

const routes: Routes = [
  {path:"pagina-principal", component:PaginaPrincipalComponent},
  // {path:"noticia", component:NoticiaComponent},
  {path:"noticia/:id",component:NoticiaComponent},
  {path:"lugar/:id",component:LugarComponent},
  {path:"productora/:id",component:ProductoraComponent},
  {path:"artista", component:ArtistaComponent},
  {path:"all-noticias", component:AllNoticiasComponent},
  {path:"all-artistas", component:AllArtistasComponent},
  {path:"all-eventos", component:EventosComponent},
  {path:"all-lugares", component:AllLugaresComponent},
  {path:"evento", component:EventoComponent},
  {path:"aside", component:AsideSpotifyComponent},
  
  // rutas de login
  {path:"admin", component:AdminComponent},
  {path:"login", component:LoginComponent},
  {path:"in-login", component:InLoginComponent},

  // formularios de edit
  {path:"artistas-admin", component:ArtistasAdminComponent},
  {path:"lugares-admin", component:LugaresAdminComponent},
  {path:"eventos-admin", component:EventosAdminComponent},
  {path:"noticias-admin", component:NoticiasAdminComponent},
  {path:"productoras-admin", component:ProductorasAdminComponent},


  // {path:"**", redirectTo: "/", pathMatch:"full"},
  {path:"", redirectTo: "pagina-principal", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
