import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";

@Component({
  selector: 'page-list',
  templateUrl: 'anuncio.html'
})
export class AnuncioPage {
  adv:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,private toastCtrl: ToastController,public http: Http) {
    this.adv = navParams.get('adv');

  }
  goodToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  favorito(){
    this.storage.get('user').then((data) => {
      if(data != null)
      {
        var data2={name:data.name,advid:this.adv.id};
        this.http.post("http://10.193.155.95:3500/addfavorite",data2).subscribe(
          result=>{if(result.text()="asd"){
            this.goodToast("Añadido a favoritos!")}},
          error=>this.goodToast("Vaya...")
        );
      }
    });


  }



  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(AnuncioPage, {
      item: item
    });
  }
}
