import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import {GoogleMap, GoogleMaps} from "@ionic-native/google-maps";
import {OPerfilPage} from "../OPerfil/operfil";
import { Events } from 'ionic-angular';
import {AnunciosPage} from "../Anuncios/anuncios";
import {FavoritosPage} from "../Favoritos/favoritos";

@Component({
  selector: 'page-list',
  templateUrl: 'anuncio.html'
})
export class AnuncioPage {
  adv:any;
  timestamp:any;
  date:any;
  page:any;
  map:GoogleMap;
  fav: boolean;

  constructor(public events: Events, private googleMaps: GoogleMaps,public platform: Platform,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,private toastCtrl: ToastController,public http: Http) {
    this.adv = navParams.get('adv');
    this.fav = navParams.get('fav');
    this.page = navParams.get('page');
    this.storage.get('user').then((data) => {
      if(data != null) {
        var data2 = {name: data.name};
        http.post("http://147.83.7.156:3500/getfavorite",data2).map(res => res.json()).subscribe(
          result => {
              if( result == "True"){
                this.fav = false;
              }
              else{
                this.fav = true;
              }
          }, error => {
            console.log("error")
          });
      }

    });
   this.timestamp = this.adv.id.toString().substring(0,8);
   this.date = new Date( parseInt( this.timestamp, 16 ) * 1000 ).toLocaleDateString();
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap(){
    this.map = new GoogleMap('map');
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
        this.http.post("http://147.83.7.156:3500/addfavorite",data2).map(res=>res.toString()).subscribe(
          result=>{
            if(result="Added to favorites"){
            this.goodToast("Añadido a favoritos!")
            this.events.publish('added');
              this.fav = false;
            }},
          error=>this.goodToast("Vaya...")
        );
      }
    });
  }
  unfavorito(row){

    this.storage.get('user').then((data) => {
      if(data != null) {
        var data2 = {name: data.name, advid: this.adv.id};
        this.http.post("http://147.83.7.156:3500/deletefavorite",data2).map(res => res.toString()).subscribe(
          result => {
            if(result="Deleted from favorites"){
            this.goodToast("Eliminado de favoritos!");
            this.events.publish('added');
            this.fav = true;
          }},
          error=>this.goodToast("Vaya...")
        )};
    });

  }
  back(){
    if(this.page == "AnunciosPage") {
      this.navCtrl.setRoot(AnunciosPage, "hola", {animate: true, direction: 'back'})
    }
    if(this.page == "FavoritosPage"){
      this.navCtrl.setRoot(FavoritosPage, "hola", {animate: true, direction: 'back'})
    }
  }
}
