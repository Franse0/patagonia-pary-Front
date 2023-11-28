import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// cuestiones de funciones
import { AppRoutingModule } from './app-routing.module';

// MercadoPago
// import { MercadopagoComponent } from './componentes/mercadopago/mercadopago.component';
// import { MercadoPagoConfig, Payment } from 'mercadopago';

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

import { HttpClientModule} from "@angular/common/http";
import { NoticiaComponent } from './componentes/noticias/noticia/noticia.component';
import { ArtistaComponent } from './componentes/artistas/artista/artista.component';



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
    PaginaPrincipalComponent,
    NoticiaComponent,
    ArtistaComponent,
    // MercadopagoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports:[ ArtistasComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
