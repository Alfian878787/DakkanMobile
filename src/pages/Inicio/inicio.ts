import { Component } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {AnunciosPage} from "../Anuncios/anuncios";
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-list',
  templateUrl: 'inicio.html'
})
export class InicioPage {
  name:string;
  pass:string;

  constructor(public alertCtrl: AlertController,public storage:Storage,public http: Http,public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController) {
    this.http=http;

  }
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Register',
      message: "Introduce un nombre de usuario",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre de usuario',
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        },
        {
          name:'password2',
          placeholder:'Confirmar contraseña',
          type:'password'
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
            if (data.password != data.password2) {
              this.goodToast("Las contraseñas no coinciden")
            }
            else{
            if (data.password == data.password2) {
              var data2 = {name: data.name, password: data.password};
              this.http.post("http://147.83.7.156:3500/push", data2).map(res => res.json()).subscribe(
                result => {
                  this.navCtrl.setRoot(AnunciosPage);
                  this.storage.set('user', result);
                },
                error => this.goodToast("El usuario ya existe")
              );
            }
          }
          }
        }
      ]
    });
    prompt.present();
  }
  goodToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  login(){
    var data={name:this.name,password:this.pass};

  this.http.post("http://147.83.7.156:3500/login",data).map(res => res.json()).subscribe(
    result=>{
      if(result[0]==undefined){
        this.goodToast("Usuario inválido")
      }
      else{
        this.navCtrl.setRoot(AnunciosPage);
        this.storage.set('user', result[0]);
      }
    },
    error=>this.goodToast("Usuario inválido")
  );
  }

}
