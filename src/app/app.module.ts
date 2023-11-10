import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// cuestiones de funciones
import { AppRoutingModule } from './app-routing.module';

// Componentes de la pagina principal
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { BuscadorComponent } from './componentes/buscador/buscador.component';
import { ProximosEventosComponent } from './componentes/proximos-eventos/proximos-eventos.component';
import { ArtistasComponent } from './componentes/artistas/artistas.component';
import { NoticiasComponent } from './componentes/noticias/noticias.component';
import { LugaresComponent } from './componentes/lugares/lugares.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { AsideSpotifyComponent } from './componentes/aside-spotify/aside-spotify.component';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BuscadorComponent,
    ProximosEventosComponent,
    ArtistasComponent,
    NoticiasComponent,
    LugaresComponent,
    FooterComponent,
    AsideSpotifyComponent,
    PaginaPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
