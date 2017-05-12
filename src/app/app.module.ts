import {BrowserModule} from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { PerfilPage } from '../pages/Perfil/perfil';
import { PerfOpinionPage } from '../pages/PerfOpinion/perfopinion';
import { PerfAnunciosPage } from '../pages/PerfAnuncios/perfanuncios';
import { MessagesPage } from '../pages/Mensajes/messages';
import { FavoritosPage} from '../pages/Favoritos/favoritos';
import { AjustesPage} from '../pages/Ajustes/ajustes';
import { InicioPage} from '../pages/Inicio/inicio';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HttpModule} from "@angular/http";
import {AnunciosPage} from '../pages/Anuncios/anuncios';
import {AnuncioPage} from '../pages/Anuncio/anuncio';
import {AnuncioPerfilPage} from '../pages/AnuncioPerfil/anuncioperfil';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import {OPerfilPage} from "../pages/OPerfil/operfil";
import {NewAnuncioPage} from '../pages/NewAnuncio/newanuncio';
import { ReviewsPage} from '../pages/Reviews/reviews';
import { MapaPage} from '../pages/Mapa/mapa';
import {AutocompletePage} from "../pages/AutcompletePage/autocompletepage";
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import {MomentModule} from 'angular2-moment';


@NgModule({
  declarations: [
    MyApp,
    PerfilPage,
    MessagesPage,
    FavoritosPage,
    AjustesPage,
    InicioPage,
    AnunciosPage,
    AnuncioPage,
    OPerfilPage,
    NewAnuncioPage,
    ReviewsPage,
    MapaPage,
    PerfOpinionPage,
    PerfAnunciosPage,
    AnuncioPerfilPage,
    MapaPage,
    AutocompletePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    MomentModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PerfilPage,
    MessagesPage,
    FavoritosPage,
    AjustesPage,
    InicioPage,
    AnunciosPage,
    AnuncioPage,
    OPerfilPage,
    NewAnuncioPage,
    ReviewsPage,
    MapaPage,
    PerfOpinionPage,
    PerfAnunciosPage,
    AnuncioPerfilPage,
    MapaPage,
    AutocompletePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    GoogleMaps,
    NativeGeocoder

  ]
})
export class AppModule {}
