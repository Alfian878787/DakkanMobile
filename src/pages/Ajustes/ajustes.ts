import { Component } from '@angular/core';
import {ActionSheetController, NavController,LoadingController, Loading,ToastController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-list',
  templateUrl: 'ajustes.html'
})
export class AjustesPage {
  public base64Image: string;
  lastImage: string = null;
  img64:any;
  loading: Loading;
  uploadFile: any;
  img:any;
  newname:string;
  newpass:string;
  newpass2:string;
  showCloseBtn:boolean;

  constructor(public alertCtrl: AlertController,public http: Http,public storage:Storage,public navCtrl: NavController, private camera: Camera, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
    this.showCloseBtn = false;
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
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Usuario inválido',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  updateName(){
    let prompt = this.alertCtrl.create({
      title: 'Cambiar Nombre',
      message: "Introduce un nombre de usuario nuevo",
      inputs: [
        {
          name: 'newname',
          placeholder: 'Nuevo nombre de usuario',
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
          handler: data3 => {
            this.storage.get('user').then((data2) => {
              if (data2 != null) {
                var data = {name: data2.name, new: data3.newname};
                this.http.put("http://10.193.155.95:3500/updateName", data).map(res => res.json()).subscribe(
                  result => {
                    if (result.toString()!= "500") {
                      this.goodToast("Nombre cambiado correctamente");
                      data2.name = this.newname;
                      this.storage.set('user',data2);
                      this.newname = "";
                    } else {
                      this.goodToast(this.newname + " ya esta en uso");
                    }
                  }
                );
              }

            });
          }
        }
      ]
    });
    prompt.present();
  }

  updatePass(){
    let prompt = this.alertCtrl.create({
      title: 'Cambiar Contraseña',
      inputs: [
        {
          name: 'pass',
          type:'password',
          placeholder: 'Escribe la constraseña vieja',
        },
        {
          name: 'newpass',
          type:'password',
          placeholder: 'Escribe la nueva contraseña',
        },
        {
          name: 'newpass2',
          type:'password',
          placeholder: 'Repite la nueva contraseña',
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
          handler: data3 => {
            if(data3.newpass == data3.newpass2) {
              this.storage.get('user').then((data2) => {
                if (data2 != null) {
                  var data = {name:data2.name,password: data3.pass, new: data3.newpass};
                  this.http.put("http://10.193.155.95:3500/updatePass", data).map(res => res.json()).subscribe(
                    result => {
                      if (result.toString() != "500") {
                        this.goodToast("Contraseña cambiada correctamente");
                        data2.password = data3.newpass;
                        this.storage.set('user', data2);
                        this.newname = "";
                      } else {
                        this.goodToast("No se puede cambiar contraseña");
                      }
                    }
                  );
                }
              });
            }
            else{
              this.goodToast("Rellena los campso correctamente")
            }
          }
        }
      ]
    });
    prompt.present();

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



