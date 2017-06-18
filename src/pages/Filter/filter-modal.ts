import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import {Http} from "@angular/http";
/**
 * Generated class for the FilterModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-filter-modal',
  templateUrl: 'filter-modal.html',
})
export class FilterModalPage {
  data:any;
  search:any;
  category:any;
  constructor(public http: Http,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  closeModal() {
      this.viewCtrl.dismiss(this.data);
  }
  filter(){
    if((this.search == undefined)&&(this.category == undefined)){

    }
    if((this.search != undefined)&&(this.category == undefined)){

      this.http.get("http://147.83.7.156:3500/search/"+this.search).subscribe(data => {
        this.data = data.json();
        this.closeModal();
      });

    }
    if((this.search == undefined)&&(this.category != undefined)){

      this.http.get("http://147.83.7.156:3500/allAdvs").subscribe(data => {

        var cat = [];
        var advs;
        advs = data.json();

        for (var i=0; i < advs.length; i++) {

          if (this.category == "Todo") {

            cat.push(advs[i])
          }
          else if ((advs[i].category == this.category) || (advs[i].category == "Todo")) {
            cat.push(advs[i])
          }
        }
        this.data = cat;
        this.closeModal();
      });

    }
    if((this.search != undefined)&&(this.category != undefined)){
      this.http.get("http://147.83.7.156:3500/search/"+this.search).subscribe(data => {
        var cat = [];
        var advs;
        advs = data.json();

        for (var i=0; i < advs.length; i++) {

          if (this.category == "Todo") {

            cat.push(advs[i])
          }
          else if ((advs[i].category == this.category) || (advs[i].category == "Todo")) {
            cat.push(advs[i])
          }
        }
        this.data = cat;
        this.closeModal();
      });
    }


  }


}
