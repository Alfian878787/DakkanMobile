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
import {NativeGeocoder, NativeGeocoderForwardResult} from "@ionic-native/native-geocoder";
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-list',
  templateUrl: 'anuncios.html'
})
export class AnunciosPage {

  grid: Array<Array<string>>;
  pos :any;
  catadv:any;

  constructor(private geo: NativeGeocoder,public geolocation: Geolocation,public modalCtrl: ModalController,public events:Events, public alertCtrl: AlertController,public http: Http,public storage:Storage,public navCtrl: NavController, private camera: Camera, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
    this.geolocation.getCurrentPosition().then((position) => {
      this.pos={latitude:position.coords.latitude,longitude:position.coords.longitude};
      this.initializeItems();
    });

  }

  initializeItems(){
    this.http.get("http://147.83.7.156:3500/allAdvs").subscribe(data => {
        var catadv = [];
        for (var i = 0; i < data.json().length; i++) {
          var posadv;
          var dist;
          var adv = data.json()[i];
          this.geo.forwardGeocode(data.json()[i].location).then((res: NativeGeocoderForwardResult) => {
            posadv = res;
            dist = this.getDistance(this.pos, posadv);
            catadv.push({
              adv: adv,
              posadv: posadv,
              dist: dist
            });
          })
        }
          catadv.sort(function (a, b) {
            return a.dist - b.dist;
          });
          console.log(catadv);
          console.log(catadv[0].adv);
          console.log(catadv.length);

          this.grid = Array(Math.ceil(catadv.length / 2)); //MATHS!
          let rowNum = 0;

          for (let i = 0; i < catadv.length; i += 2) {
            this.grid[rowNum] = Array(2);
            if (catadv[i]) {

              this.grid[rowNum][0] = catadv[i]
            }
            if (i + 1 < data.json().length) {
              this.grid[rowNum][1] = catadv[i + 1]
            }
            rowNum++;
          }

      }, error => {
      console.log("error")
    });
  }

  rad(x) {
    return x * Math.PI / 180;
  };

  getDistance(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.rad(p2.latitude - p1.latitude);
    var dLong = this.rad(p2.longitude - p1.longitude);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.rad(p1.latitude)) * Math.cos(this.rad(p2.latitude)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };

  getLocAdv(pos){
      this.geo.forwardGeocode(pos).then((res: NativeGeocoderForwardResult) => {
       return res;
      })
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
