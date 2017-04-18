import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
  declarations: [
    MyApp,
    PerfilPage,
    MessagesPage,
    FavoritosPage,
    AjustesPage,
    InicioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PerfilPage,
    MessagesPage,
    FavoritosPage,
    AjustesPage,
    InicioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
