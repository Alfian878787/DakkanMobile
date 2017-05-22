import { Component } from '@angular/core';
import {ActionSheetController, NavController,LoadingController,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {OPerfilPage} from "../OPerfil/operfil";

@Component({
  selector: 'page-list',
  templateUrl: 'treats.html'
})
export class TreatsPage {
    grid: Array<string>;
  constructor(public events: Events, public alertCtrl: AlertController, public http: Http, public storage: Storage, public navCtrl: NavController, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {

    this.load();

  }
  load(){
    this.storage.get('user').then((data) => {
      if(data != null) {
        var data2 = {name: data.name};
        this.http.post("http://147.83.7.156:3500/treatsdone",data2).map(res => res.json()).subscribe(
          result => {
            this.grid = Array(result.length);
            for(let i=0;i<result.length;i++) {
              this.grid[i] = result[i];
            }
          }, error => {
            console.log("error")
          });
      }
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
  oprofile(row){
    this.navCtrl.push(OPerfilPage,{adv:row})
  }




}
