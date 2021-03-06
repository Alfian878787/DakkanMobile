import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-list',
  templateUrl: 'reviews.html'
})
export class ReviewsPage {
  title: any;
  description: any;
  rating: any;
  usrname:any;

  constructor(public storage:Storage,public http: Http,public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController) {
    this.usrname = navParams.get('usrname');
    this.rating=0;
  }
  goodToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  save(){

    this.storage.get('user').then((data) => {
      console.log(this.rating)
      let review = {
        usrname: this.usrname,
        title: this.title,
        description: this.description,
        rating: this.rating,
        reviewername:data.name,
        reviewerid:data._id
      };
      this.http.post('http://147.83.7.156:3500/postreview',review).map(res=>{
        let body =res.text();
        if(body=="ok"){
          this.goodToast("Review subida correctamente")
        }
        else{
          this.goodToast("Algo falló")
        }
      }).subscribe();
      this.navCtrl.pop();
    });

  }


  close() {
    this.navCtrl.pop()
  }

}
