import { Component } from '@angular/core';
import {ActionSheetController, NavController,LoadingController, Loading,ToastController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'perfil.html'
})

export class PerfilPage {
  public base64Image: string;
  lastImage: string = null;
  img64:any;
  loading: Loading;
  uploadFile: any;
  img:any;


  constructor(public http: Http,public storage:Storage,public navCtrl: NavController, private camera: Camera, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {

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
    this.storage.get('user').then((data) => {
      if(data != null)
      {
        this.img.append('file',this.img64);
        this.img.append('id',data._id);



        this.http.post("http://10.193.155.95:3500/upload",this.img).map(res=>res.toString()).subscribe(
        result=>{if(result="File is uploades"){
          this.goodToast("Imagen de perfil actualizada")}},
        error=>this.goodToast("Vaya...")
      );
        this.img="";
      }
    });
  }

}



