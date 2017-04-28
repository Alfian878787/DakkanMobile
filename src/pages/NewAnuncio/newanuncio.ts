import { Component } from '@angular/core';
import {
  NavController, NavParams, ToastController, AlertController, ActionSheetController, Loading,
  LoadingController
} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import {AnunciosPage} from "../Anuncios/anuncios";

@Component({
  selector: 'page-list',
  templateUrl: 'newanuncio.html'
})
export class NewAnuncioPage {
  public base64Image: string;
  lastImage: string = null;
  img64:any;
  loading: Loading;
  uploadFile: any;
  img:any;
  title: string;
  description: string;
  exchange: string;
  category: string;
  showCloseBtn:boolean;

  constructor(public alertCtrl: AlertController,public http: Http,public storage:Storage,public navCtrl: NavController, private camera: Camera, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
    this.http=http;
  }

  close(){
    this.navCtrl.setRoot(AnunciosPage);
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/png;base64," + imageData;
      this.img64=imageData;
      this.img=new FormData();
      this.showCloseBtn = true;
    }, (err) => {
      console.log(err);
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

  upload(){

    var data={title:this.title,owner:this.title,description:this.description,exchange:this.exchange,category:this.category};

    this.http.post("http://10.193.155.95:3500/login",data).map(res => res.json()).subscribe(
      result=>{this.navCtrl.setRoot(AnunciosPage);this.storage.set('user', result);},
      error=>this.goodToast("Usuario inválido")
    );

  }
}
