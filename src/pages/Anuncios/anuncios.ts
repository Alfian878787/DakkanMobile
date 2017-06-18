import { Component } from '@angular/core';
import {ActionSheetController, NavController, LoadingController, ToastController, Events} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {AnuncioPage} from '../Anuncio/anuncio';
import {NewAnuncioPage} from "../NewAnuncio/newanuncio";
import { ModalController } from 'ionic-angular';
import { FilterModalPage } from '../Filter/filter-modal';


@Component({
  selector: 'page-list',
  templateUrl: 'anuncios.html'
})
export class AnunciosPage {

  grid: Array<Array<string>>;
  pos :any;

  constructor(public modalCtrl: ModalController,public events:Events, public alertCtrl: AlertController,public http: Http,public storage:Storage,public navCtrl: NavController, private camera: Camera, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {

      this.initializeItems();


  }

  initializeItems(){
    this.http.get("http://147.83.7.156:3500/allAdvs").subscribe(data => {

          this.grid = Array(Math.ceil(data.json().length / 2)); //MATHS!
          let rowNum = 0;

          for (let i = 0; i < data.json().length; i += 2) {
            this.grid[rowNum] = Array(2);
            if (data.json()[i]) {

              this.grid[rowNum][0] = data.json()[i]
            }
            if (i + 1 < data.json().length) {
              this.grid[rowNum][1] = data.json()[i + 1]
            }
            rowNum++;
          }

      }, error => {
      console.log("error")
    });
  }


  addAdv(){
    this.navCtrl.push(NewAnuncioPage)
  }
  goodToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  detalle(image){
    this.navCtrl.push(AnuncioPage,{adv:image,page:"AnunciosPage"},{animate:true, direction:'forward'})

  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  filtro(){
    let myModal = this.modalCtrl.create(FilterModalPage);

    myModal.onDidDismiss(data => {
      if(data != undefined) {
        this.grid = Array(Math.ceil(data.length / 2)); //MATHS!
        let rowNum = 0;

        for (let i = 0; i < data.length; i += 2) {
          this.grid[rowNum] = Array(2);
          if (data[i]) {

            this.grid[rowNum][0] = data[i]
          }
          if (i + 1 < data.length) {
            this.grid[rowNum][1] = data[i + 1]
          }
          rowNum++;
        }
      }
    });

    myModal.present();

  }

}
