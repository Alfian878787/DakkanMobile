import { Component } from '@angular/core';
import {
  ActionSheetController, NavController, LoadingController, ToastController,
  NavParams
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'perfopinion.html'
})

export class PerfOpinionPage {
  user:any;
  date:any;
  reviews: any;

  constructor(public navParams: NavParams,public http: Http,public storage:Storage,public navCtrl: NavController, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
    this.user = navParams.data;
    let timestamp = this.user._id.toString().substring(0,8);
    this.date = new Date( parseInt( timestamp, 16 ) * 1000 ).toLocaleDateString();
      this.getReviews();
      this.reviews="";
  }

  getReviews(){
    let data2={id:this.user._id};
    this.http.post('http://147.83.7.156:3500/getreviews',data2)
      .map(res => res.json())
      .subscribe(data => {
        let rev;
        let revlist=[];

        for(let i=0;i<data.length;i++)
        {

            rev={id:data[i]._id,title:data[i].title,description:data[i].description,rating: data[i].rating, reviewername:data[i].reviewername,
              reviewerid:data[i].reviewerid,itsme:false};
            revlist.push(rev);

        }
        this.reviews = revlist;

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

}



