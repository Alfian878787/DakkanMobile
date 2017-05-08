import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, Events,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PerfilPage } from '../pages/Perfil/perfil';
import { MessagesPage } from '../pages/Mensajes/messages';
import { FavoritosPage} from '../pages/Favoritos/favoritos';
import { AjustesPage} from '../pages/Ajustes/ajustes';
import { InicioPage} from '../pages/Inicio/inicio';
import { AnunciosPage} from '../pages/Anuncios/anuncios';


@Component({
  templateUrl: 'app.html'

})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = InicioPage;

  name:any;
  pages: Array<{title: string, component: any}>;

  constructor(private events: Events, private toastCtrl: ToastController,public storage: Storage,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.events.subscribe('log',() => {
      this.storage.get('user').then((data) => {
        if(data != null) {
          this.name = data.name;
        }
        else{
          this.name="";
        }
      });
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Anuncios', component: AnunciosPage },
      { title: 'Perfil', component: PerfilPage },
      { title: 'Messages', component: MessagesPage },
      { title: 'Favoritos', component: FavoritosPage },
      { title: 'Ajustes', component: AjustesPage }
    ];

  }

  logout(){
    this.nav.setRoot(InicioPage).then(()=>{
    });

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
