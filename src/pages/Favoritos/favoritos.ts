import { Component } from '@angular/core';
import {ActionSheetController, NavController,LoadingController,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {OPerfilPage} from "../OPerfil/operfil";

@Component({
  selector: 'page-list',
  templateUrl: 'favoritos.html'
})
export class FavoritosPage {
    grid: Array<string>;
  constructor(public events: Events, public alertCtrl: AlertController, public http: Http, public storage: Storage, public navCtrl: NavController, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {

    this.load();

    this.events.subscribe('aded',() => {
      const toast = this.toastCtrl.create({
        message: `Hello darknessmyolfriend`,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });

  }
  load(){
    this.storage.get('user').then((data) => {
      if(data != null) {
        var data2 = {name: data.name};
        this.http.post("http://147.83.7.156:3500/profile",data2).map(res => res.json()).subscribe(
          result => {
            this.grid = Array(result.advs.length);
            for(let i=0;i<result.advs.length;i++) {
              this.grid[i] = result.advs[i];
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
  unfavorito(row){

    this.storage.get('user').then((data) => {
      if(data != null) {
        var data2 = {name: data.name, advid: row.id};
        this.http.post("http://147.83.7.156:3500/deletefavorite",data2).map(res => res.toString()).subscribe(
          result => {
            if(result="Deleted from favorites"){
              this.goodToast("Eliminado de favoritos!");
              let index = this.grid.indexOf(row);

              if(index > -1){
                this.grid.splice(index, 1);
              }
            }},
          error=>this.goodToast("Vaya...")
        )};
    });

  }




}
