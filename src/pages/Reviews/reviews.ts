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
  }
  goodToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  save(): void {

    this.storage.get('user').then((data) => {
      if(this.rating="undefined"){
     this.rating=0;
      }
      let review = {
        usrname: this.usrname,
        title: this.title,
        description: this.description,
        rating: this.rating,
        reviewername:data.name,
        reviewerid:data._id
      };
      this.http.post('http://10.192.135.122:3500/postreview',review).subscribe(res => {

      });
      this.navCtrl.pop();
    });

  }

  close(): void {
    this.navCtrl.pop()
  }

}
