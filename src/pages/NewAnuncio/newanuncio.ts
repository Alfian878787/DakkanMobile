import { Component } from '@angular/core';
import {
  NavController, ToastController, AlertController, ActionSheetController, Loading,
  LoadingController
} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import {AnunciosPage} from "../Anuncios/anuncios";
import {MapaPage} from "../Mapa/mapa";

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
    this.navCtrl.pop();
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

  upload() {
    this.storage.get('user').then((data2) => {

      if (data2 != null) {
        var nameimg = data2._id+"-"+this.title;
        this.img.append('file',this.img64);
        this.img.append('name',nameimg);
        if(data2.location) {
          var data = {
            title: this.title,
            owner: data2._id,
            active:true,
            description: this.description,
            exchange: this.exchange,
            category: this.category,
            location: data2.location
          };
          this.http.post("http://147.83.7.156:3500/uploadadv",this.img).map(res=>res.toString()).subscribe(
            result=> {
              if (result = "File is uploaded") {
                this.http.post("http://147.83.7.156:3500/addAdv", data).map(res => res.json()).subscribe(
                  result => {
                    if (result.toString() != "500") {
                      this.goodToast("Anuncio Añadido");
                      this.navCtrl.setRoot(AnunciosPage, "hola", {animate: true, direction: 'back'});
                    }
                    else {
                      this.goodToast("Rellena los campos correctamente");
                    }
                  },
                  error => this.goodToast("Error al subir el anuncio")
                );
              }
            },
            error => this.goodToast("Error al subir imagen")
          );
        }
        else{
          this.goodToast("Primero establece un lugar de intercambio")
        }
        this.img="";
      }
    });
  }
}

