import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// cuestiones de funciones
import { AppRoutingModule } from './app-routing.module';
import { initializeApp} from "firebase/app";
import { AngularFireModule } from '@angular/fire/compat';

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
import { AllNoticiasComponent } from './componentes/noticias/all-noticias/all-noticias.component';
import { AllArtistasComponent } from './componentes/artistas/all-artistas/all-artistas.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { EventoComponent } from './componentes/eventos/evento/evento.component';
import { EventoSelectComponent } from './componentes/proximos-eventos/evento-select/evento-select.component';
import { AllLugaresComponent } from './componentes/lugares/all-lugares/all-lugares.component';
import { LugarComponent } from './componentes/lugares/lugar/lugar.component';
import { ProductorasComponent  } from './componentes/entidades/productoras.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { LoginComponent } from './componentes/admin/login/login.component';
import { InLoginComponent } from './componentes/admin/in-login/in-login.component';
import { ArtistasAdminComponent } from './componentes/admin/in-login/artistas-admin/artistas-admin.component';
import { EventosAdminComponent } from './componentes/admin/in-login/eventos-admin/eventos-admin.component';
import { NoticiasAdminComponent } from './componentes/admin/in-login/noticias-admin/noticias-admin.component';
import { ProductorasAdminComponent } from './componentes/admin/in-login/productoras-admin/productoras-admin.component';
import { LugaresAdminComponent } from './componentes/admin/in-login/lugares-admin/lugares-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoraComponent } from './componentes/entidades/productora/productora.component';
import { GaleriaComponent } from './componentes/galeria/galeria.component';
import { enviroment } from 'src/enviroments/enviroments';
import { SumarteComponent } from './componentes/sumarte/sumarte.component';

// soundcloud




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
    AllNoticiasComponent,
    AllArtistasComponent,
    EventosComponent,
    EventoComponent,
    EventoSelectComponent,
    AllLugaresComponent,
    LugarComponent,
    ProductorasComponent,
    ProductoraComponent,
    AdminComponent,
    LoginComponent,
    InLoginComponent,
    ArtistasAdminComponent,
    EventosAdminComponent,
    NoticiasAdminComponent,
    ProductorasAdminComponent,
    LugaresAdminComponent,
    GaleriaComponent,
    SumarteComponent,
    // MercadopagoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(enviroment.firebaseConfig)
    // LightboxModule,
  ],
  exports:[ ArtistasComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
