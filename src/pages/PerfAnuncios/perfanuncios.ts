import { Component } from '@angular/core';
import {
  ActionSheetController, NavController, LoadingController, ToastController,
  NavParams
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {AnuncioPage} from "../Anuncio/anuncio";


@Component({
  selector: 'page-home',
  templateUrl: 'perfanuncios.html'
})

export class PerfAnunciosPage {
  user:any;
  date:any;
  grid: Array<string>;

  constructor(public navParams: NavParams,public http: Http,public storage:Storage,public navCtrl: NavController, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
    this.user = navParams.data;
    let timestamp = this.user._id.toString().substring(0,8);
    this.date = new Date( parseInt( timestamp, 16 ) * 1000 );
      this.getAdvs();
  }

  getAdvs(){
    let data2={id:this.user._id,name:this.user.name};
    this.http.post('http://147.83.7.156:3500/userAdvs',data2).map(res => res.json()).subscribe(
      data => {
        this.grid = Array(data.length);
        for(let i=0;i<data.length;i++) {
          this.grid[i] = data[i];
        }
      },error => {
        console.log("error")
      });
  }
  goodToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  detalle(row){
    this.navCtrl.push(AnuncioPage,{adv:row,fav:true,page:"AnunciosPage"},{animate:true, direction:'forward'})

  }

}



