import {BrowserModule} from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { PerfilPage } from '../pages/Perfil/perfil';
import { MessagesPage } from '../pages/Mensajes/messages';
import { FavoritosPage} from '../pages/Favoritos/favoritos';
import { AjustesPage} from '../pages/Ajustes/ajustes';
import { InicioPage} from '../pages/Inicio/inicio';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HttpModule} from "@angular/http";
import {AnunciosPage} from '../pages/Anuncios/anuncios';
import {AnuncioPage} from '../pages/Anuncio/anuncio';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    PerfilPage,
    MessagesPage,
    FavoritosPage,
    AjustesPage,
    InicioPage,
    AnunciosPage,
    AnuncioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
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
    AnuncioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},


  ]
})
export class AppModule {}
