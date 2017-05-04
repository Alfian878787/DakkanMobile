import { Component } from '@angular/core';
import {ActionSheetController, NavController,LoadingController,ToastController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {AnuncioPage} from '../Anuncio/anuncio';
import {NewAnuncioPage} from "../NewAnuncio/newanuncio";

@Component({
  selector: 'page-list',
  templateUrl: 'anuncios.html'
})
export class AnunciosPage {
  items: Array<{title: string}>;
  grid: Array<Array<string>>;
  constructor(public alertCtrl: AlertController,public http: Http,public storage:Storage,public navCtrl: NavController, private camera: Camera, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {

    this.items = [];
    http.get("http://147.83.7.156:3500/allAdvs").subscribe(data => {

      this.grid = Array(Math.ceil(data.json().length/2)); //MATHS!
      let rowNum = 0;

      for(let i=0;i<data.json().length;i+=2) {
        this.grid[rowNum] = Array(2);
        if (data.json()[i]) {

          this.grid[rowNum][0] = data.json()[i]
        }
        if(i+1 < data.json().length){
          this.grid[rowNum][1] = data.json()[i + 1]
        }
        rowNum++;
      }
    }, error => {
      console.log("error")
    });
  }

  addAdv(){
    this.navCtrl.setRoot(NewAnuncioPage,"hola",{animate:true, direction:'forward'})
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
    this.navCtrl.setRoot(AnuncioPage,{adv:image,fav:true,page:"AnunciosPage"},{animate:true, direction:'forward'})

  }


}
