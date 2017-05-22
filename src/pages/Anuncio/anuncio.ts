import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ToastController, AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import {GoogleMap, GoogleMaps} from "@ionic-native/google-maps";
import {OPerfilPage} from "../OPerfil/operfil";
import { Events } from 'ionic-angular';
import {AnunciosPage} from "../Anuncios/anuncios";
import {FavoritosPage} from "../Favoritos/favoritos";
import {NativeGeocoder, NativeGeocoderForwardResult} from "@ionic-native/native-geocoder";
declare var google:any;
@Component({
  selector: 'page-list',
  templateUrl: 'anuncio.html'
})
export class AnuncioPage {
  adv:any;
  timestamp:any;
  date:any;
  page:any;
  map:any;
  fav: boolean;
  address:any;

  constructor(public alertCtrl: AlertController,private geo:NativeGeocoder,public events: Events, private googleMaps: GoogleMaps,public platform: Platform,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,private toastCtrl: ToastController,public http: Http) {
    this.adv = navParams.get('adv');
    this.fav = true;
    this.page = navParams.get('page');
    this.storage.get('user').then((data) => {
      if(data != null) {
        var data2 = {name: data.name, advid:this.adv.id};
        http.post("http://147.83.7.156:3500/getfavorite",data2).map(res =>{
              let response = res.text();
              if(response =="True"){
                this.fav = false;
              }
              else{
                this.fav = true;
              }
          }).subscribe()
      }

    });
   this.timestamp = this.adv.id.toString().substring(0,8);
   this.date = new Date( parseInt( this.timestamp, 16 ) * 1000 );
    platform.ready().then(() => {
      this.getpos(this.adv.location);
    });
  }

  loadMap(pos){
    let location ={lat:pos.latitude,lng:pos.longitude};
    this.map = new google.maps.Map(document.getElementById('map'),{
      zoom:16,
      center:location
    });
  }
  getpos(pos) {
    this.geo.forwardGeocode(pos).then((res:NativeGeocoderForwardResult)=> {
      this.addMarker(res);
    })
  }
  addMarker(pos){
    this.loadMap(pos);
    let loc={lat:pos.latitude,lng:pos.longitude}
    let marker=new google.maps.Marker({
      position:loc,
      map:this.map
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

  oprofile(){
    this.navCtrl.push(OPerfilPage,{adv:this.adv})
  }

  favorito(){
    this.storage.get('user').then((data) => {
      if(data != null)
      {
        var data2={name:data.name,advid:this.adv.id};
        this.http.post("http://147.83.7.156:3500/addfavorite",data2).map(res=>{
          let result = res.text();
          if(result=="Added to favorites"){
            this.goodToast("Añadido a favoritos!")
            this.events.publish('added');
            this.fav = false;
          }
        }).subscribe()
      }
    });
  }
  unfavorito(row){

    this.storage.get('user').then((data) => {
      if(data != null) {
        var data2 = {name: data.name, advid: this.adv.id};
        this.http.post("http://147.83.7.156:3500/deletefavorite", data2).map(res => {
          let result = res.text()
          if (result == "Deleted from favorites") {
            this.goodToast("Eliminado de favoritos!");
            this.events.publish('added');
            this.fav = true;
          }
        }).subscribe()
      }
    });
  }
  back(){
    if(this.page == "AnunciosPage") {
      this.navCtrl.setRoot(AnunciosPage, "hola", {animate: true, direction: 'back'})
    }
    else {
      if (this.page == "FavoritosPage") {
        this.navCtrl.setRoot(FavoritosPage, "hola", {animate: true, direction: 'back'})
      }
    }
  }
  sendOffer() {

    let prompt = this.alertCtrl.create({
      title: 'Oferta',
      message: "Introduce tu oferta",
      inputs: [
        {
          name: 'text',
          placeholder: 'Escribe aqui tu oferta',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data);
            if (data.text == "") {
              this.goodToast("Las contraseñas no coinciden")
            }
            else {
              this.storage.get('user').then((data2) => {
                if (data2 != null) {
                  var data3 = {
                    advid: this.adv.id,
                    userid: data2._id,
                    sellerid: this.adv.owner,
                    advurl: this.adv.imageurl,
                    sellername: this.adv.ownername,
                    buyer: data2.name,
                    advname: this.adv.title,
                    offer: data.text
                  };
                  this.http.post("http://147.83.7.156:3500/sendOffer", data3).map(res => {
                    let response = res.text();
                    if (response == "200") {
                      this.goodToast("Mensaje enviado correctamente");
                      this.navCtrl.setRoot(AnunciosPage);
                    }
                    else {
                      this.goodToast("Error al hacer la oferta");
                    }
                  }).subscribe();
                }
              });
            }
          }
        }
      ]
    });
    prompt.present();
  }
}

