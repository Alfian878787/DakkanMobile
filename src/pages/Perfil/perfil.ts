import { Component } from '@angular/core';
import {
  ActionSheetController, NavController, LoadingController, ToastController,
  NavParams
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import {PerfOpinionPage} from "../PerfOpinion/perfopinion";
import 'rxjs/add/operator/map';
import {PerfAnunciosPage} from "../PerfAnuncios/perfanuncios";
import {ObjetosCambiadosPage} from "../ObjetosCambiados/objetoscambiados";


@Component({
  selector: 'page-home',
  templateUrl: 'perfil.html'
})

export class PerfilPage {
  user:any;
  date:any;
  reviews: any;
  PerfOpinion: any = PerfOpinionPage;
  Anuncios: any = PerfAnunciosPage;
  Tratos: any = ObjetosCambiadosPage;

  constructor(public navParams: NavParams,public http: Http,public storage:Storage,public navCtrl: NavController, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {

    this.user = navParams.get('user');
    let timestamp = this.user._id.toString().substring(0,8);
    this.date = new Date( parseInt( timestamp, 16 ) * 1000 ).toLocaleDateString();
    this.reviews="";
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  goodToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}



