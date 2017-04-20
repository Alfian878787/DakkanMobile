import { Component } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {AnunciosPage} from "../Anuncios/anuncios";
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-list',
  templateUrl: 'inicio.html'
})
export class InicioPage {
  name:any;
  pass:any;
  constructor(public storage:Storage,public http: Http,public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController) {
    this.http=http;

  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Usuario inválido',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  login(){
    var data={name:this.name,password:this.pass};

  this.http.post("http://10.193.155.95:3500/login",data).map(res => res.json()).subscribe(
    result=>{this.navCtrl.push(AnunciosPage);this.storage.set('user', result);},
    error=>this.presentToast()
  );
  }

}
