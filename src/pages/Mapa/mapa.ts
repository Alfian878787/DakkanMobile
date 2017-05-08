import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {GoogleMap, GoogleMaps} from "@ionic-native/google-maps";
import {Http} from "@angular/http";
@Component({
  selector: 'page-list',
  templateUrl: 'mapa.html'
})
export class MapaPage {
  map:GoogleMap;

  constructor(public platform: Platform,public navCtrl: NavController, public navParams: NavParams,private googleMaps: GoogleMaps,public http: Http) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }
  loadMap(){
    this.map = new GoogleMap('map');
  }
}
