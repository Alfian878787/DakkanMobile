import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import {GoogleMap, GoogleMaps} from "@ionic-native/google-maps";
import {OPerfilPage} from "../OPerfil/operfil";

@Component({
  selector: 'page-list',
  templateUrl: 'anuncio.html'
})
export class AnuncioPage {
  adv:any;
  timestamp:any;
  date:any;
  map:GoogleMap;

  constructor(private googleMaps: GoogleMaps,public platform: Platform,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,private toastCtrl: ToastController,public http: Http) {
    this.adv = navParams.get('adv');
   this.timestamp = this.adv.id.toString().substring(0,8);
   this.date = new Date( parseInt( this.timestamp, 16 ) * 1000 ).toLocaleDateString();
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap(){
    this.map = new GoogleMap('map');
  }
  goodToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  oprofile(){
    this.navCtrl.push(OPerfilPage,{adv:this.adv})
  }

  favorito(){
    this.storage.get('user').then((data) => {
      if(data != null)
      {
        var data2={name:data.name,advid:this.adv.id};
        this.http.post("http://10.193.155.95:3500/addfavorite",data2).map(res=>res.toString()).subscribe(
          result=>{if(result="Added to favorites"){
            this.goodToast("Añadido a favoritos!")}},
          error=>this.goodToast("Vaya...")
        );
      }
    });
  }
}
