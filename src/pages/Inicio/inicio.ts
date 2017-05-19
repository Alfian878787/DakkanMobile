import { Component } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {NavController, NavParams, ToastController, Events, Platform} from 'ionic-angular';
import {AnunciosPage} from "../Anuncios/anuncios";
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import {Facebook} from '@ionic-native/facebook';

@Component({
  selector: 'page-list',
  templateUrl: 'inicio.html'
})
export class InicioPage {
  name:string;
  pass:string;
  FB_APP_ID: number = 1798132503847698;

  constructor(private fb: Facebook, private platform: Platform,private events:Events,public alertCtrl: AlertController,public storage:Storage,public http: Http,public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController) {
    this.http=http;
    this.fb.browserInit(this.FB_APP_ID, "v2.8");

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
                  this.storage.set('user', result[0]).then(()=>{
                      this.events.publish('log');
                      this.navCtrl.setRoot(AnunciosPage);
                    }
                  );
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
  goodToast2(message,toastc) {
    let toast = toastc.create({
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
        this.storage.set('user', result[0]).then(()=>{
          this.events.publish('log');
          this.navCtrl.setRoot(AnunciosPage);
          }
        );
      }
    },
    error=>this.goodToast("Usuario inválido")
  );
  }



  loginF() {
    let permissions = new Array();
    let nav = this.navCtrl;
    let fb2 = this.fb;
    let http = this.http;
    let storage = this.storage;
    let events = this.events;
    let goodToast2 = this.goodToast2;
    let toastc = this.toastCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

    this.fb.login(permissions)
      .then(function(response){
        let userId = response.authResponse.userID;
        let params = new Array();
        //Getting name and gender properties
        fb2.api("/me?fields=name", params)
          .then(function(user) {

            var data={facebookName: user.name,facebookId: userId,facebookToken: response.authResponse.accessToken};

            http.post("http://147.83.7.156:3500/auth/facebookionic",data).map(res => res.json()).subscribe(
              result=>{

                if(result==undefined){
                  console.log(result);
                  goodToast2("Usuario inválido", toastc)
                }
                else{
                  storage.set('user', result).then(()=>{
                      console.log(result);
                      events.publish('log');
                      nav.setRoot(AnunciosPage);
                    }
                  );
                }
              },
              error=>goodToast2("Error", toastc)
            );
          })
      }, function(error){
        console.log(error);
      });

  }

}

