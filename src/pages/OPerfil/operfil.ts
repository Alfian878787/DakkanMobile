import { Component } from '@angular/core';
import {
  ActionSheetController, NavController, LoadingController, Loading, ToastController,
  NavParams
} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'operfil.html'
})

export class OPerfilPage {
adv:any;
date:any;

  constructor(public navParams: NavParams,public http: Http,public storage:Storage,public navCtrl: NavController, private camera: Camera, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
    this.adv = navParams.get('adv');
    console.log(this.adv)
    let timestamp = this.adv.owner.toString().substring(0,8);
    this.date = new Date( parseInt( timestamp, 16 ) * 1000 ).toLocaleDateString();
  }

}



