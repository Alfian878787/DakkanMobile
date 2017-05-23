import {BrowserModule} from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { PerfilPage } from '../pages/Perfil/perfil';
import { PerfOpinionPage } from '../pages/PerfOpinion/perfopinion';
import { PerfAnunciosPage } from '../pages/PerfAnuncios/perfanuncios';
import { MessagesPage } from '../pages/Mensajes/messages';
import { ChatPage } from '../pages/Chat/chat';
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
import {TreatsPage} from '../pages/Treats/treats';
import {ObjetosCambiadosPage} from '../pages/ObjetosCambiados/objetoscambiados';
import {AutocompletePage} from "../pages/AutcompletePage/autocompletepage";
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import {MomentModule} from 'angular2-moment';
import { Geolocation } from '@ionic-native/geolocation';
import { Facebook } from '@ionic-native/facebook';



@NgModule({
  declarations: [
    MyApp,
    PerfilPage,
    MessagesPage,
    ChatPage,
    TreatsPage,
    FavoritosPage,
    AjustesPage,
    InicioPage,
    AnunciosPage,
    ObjetosCambiadosPage,
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
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PerfilPage,
    MessagesPage,
    ChatPage,
    FavoritosPage,
    AjustesPage,
    InicioPage,
    AnunciosPage,
    AnuncioPage,
    ObjetosCambiadosPage,
    OPerfilPage,
    TreatsPage,
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
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    GoogleMaps,
    NativeGeocoder,
    Geolocation

  ]
})
export class AppModule {}
