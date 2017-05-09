import { Component } from '@angular/core';
import {
  ActionSheetController, NavController, LoadingController, ToastController,
  NavParams
} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {ReviewsPage} from "../Reviews/reviews";

@Component({
  selector: 'page-home',
  templateUrl: 'operfil.html'
})

export class OPerfilPage {
adv:any;
date:any;
reviews: any;
user:any;


  constructor(public navParams: NavParams,public http: Http,public storage:Storage,public navCtrl: NavController, private camera: Camera, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
    this.adv = navParams.get('adv');
    let timestamp = this.adv.owner.toString().substring(0,8);
    this.date = new Date( parseInt( timestamp, 16 ) * 1000 ).toLocaleDateString();
    this.getReviews();
    this.storage.get('user').then((data) => {
      this.user=data.name
    });
    this.reviews="";
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getReviews();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  getReviews(){
    let data2={id:this.adv.owner};
      this.http.post('http://147.83.7.156:3500/getreviews',data2)
        .map(res => res.json())
        .subscribe(data => {
          let rev;
          let revlist=[];
          for(let i=0;i<data.length;i++)
          {
           if (data[i].reviewername!=this.user){
              rev={id:data[i]._id,title:data[i].title,description:data[i].description,rating: data[i].rating, reviewername:data[i].reviewername,
                reviewerid:data[i].reviewerid,itsme:false};
              revlist.push(rev);
            }
            else{
            rev={id:data[i]._id,title:data[i].title,description:data[i].description,rating: data[i].rating, reviewername:data[i].reviewername,
              reviewerid:data[i].reviewerid,itsme:true};
            revlist.push(rev);
          }
          }
          this.reviews = revlist;

        });
  }
  postr(){
    this.navCtrl.push(ReviewsPage,{usrname:this.adv.ownername})
  }
  goodToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  deleteReview(rev){

      var data2={review_id:rev.id,name:this.adv.ownername};
      this.http.post('http://147.83.7.156:3500/deletereview',data2).map(res=>{
        let body =res.text();
        if(body=="ok"){
          let index = this.reviews.indexOf(rev);

          if(index > -1){
            this.reviews.splice(index, 1);
          }
        }
        else{
          this.goodToast("Algo falló")
        }
      }).subscribe()

  }

}



