import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PerfilPage } from '../pages/Perfil/perfil';
import { MessagesPage } from '../pages/Mensajes/messages';
import { FavoritosPage} from '../pages/Favoritos/favoritos';
import { AjustesPage} from '../pages/Ajustes/ajustes';
import { InicioPage} from '../pages/Inicio/inicio';
import {AnunciosPage} from '../pages/Anuncios/anuncios';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = InicioPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Anuncios', component: AnunciosPage },
      { title: 'Perfil', component: PerfilPage },
      { title: 'Messages', component: MessagesPage },
      { title: 'Favoritos', component: FavoritosPage },
      { title: 'Ajustes', component: AjustesPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}