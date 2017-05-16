import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, Platform} from 'ionic-angular';
import {GoogleMap, GoogleMaps} from "@ionic-native/google-maps";
import {Http} from "@angular/http";
import {AutocompletePage} from "../AutcompletePage/autocompletepage";
import {NativeGeocoder, NativeGeocoderForwardResult,NativeGeocoderReverseResult} from "@ionic-native/native-geocoder";
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
declare var google:any;

@Component({
  selector: 'page-list',
  templateUrl: 'mapa.html'
})

export class MapaPage {
  map: any;
  address;
  coords;

  constructor(public geolocation: Geolocation, public storage: Storage, private geo: NativeGeocoder, private modalCtrl: ModalController, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, public http: Http) {
    this.address = {
      place: ''
    };


  }

  getpos(pos) {
    this.geo.forwardGeocode(pos).then((res: NativeGeocoderForwardResult) => {
      this.addMarker(res);
    })

  }

  showAddressModal() {
    let modal = this.modalCtrl.create(AutocompletePage);
    modal.onDidDismiss(data => {
      if(data) {
        this.address = data;
        this.getpos(data.description)
      }
    });
    modal.present();

  }

  loadMap(pos) {

    let location = {lat: pos.latitude, lng: pos.longitude};
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: location
    });
  }

  addMarker(pos) {
    this.loadMap(pos);
    let loc = {lat: pos.latitude, lng: pos.longitude}
    let marker = new google.maps.Marker({
      position: loc,
      map: this.map
    });
  }

  saveloc() {
    this.storage.get('user').then((data) => {

      let data2 = {name: data.name, location: this.address.description};

      this.http.put("http://147.83.7.156:3500/updateLocation", data2).subscribe(
        result => {
          var user = data;
          user.location = this.address.description;
          this.storage.set('user', user).then(() => {
            console.log(user);
            this.navCtrl.pop()
          });
        }
      );
    });
  }

  getloc() {

    this.geolocation.getCurrentPosition().then((position) => {
      this.geo.reverseGeocode(position.coords.latitude, position.coords.longitude).then((res: NativeGeocoderReverseResult) => {
        let result=res.street+" "+res.houseNumber+", "+res.city+", "+res.countryName;
        this.address.description=result;
        let pos={latitude:position.coords.latitude,longitude:position.coords.longitude};
        this.addMarker(pos);
      });
      });

  }
}
