import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-list',
  templateUrl: 'anuncios.html'
})
export class AnunciosPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string}>;
  grid: Array<Array<string>>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');


    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    http.get("http://10.193.155.95:3500/allAdvs").subscribe(data => {

      this.grid = Array(Math.ceil(data.json().length/2)); //MATHS!
      let rowNum = 0;

      for(let i=0;i<data.json().length;i+=2) {
        this.grid[rowNum] = Array(2);
        if (data.json()[i]) {
          this.grid[rowNum][0] = data.json()[i].title
        }

        if (data.json()[i + 1]) {
          this.grid[rowNum][1] = data.json()[i + 1].title
        }
        rowNum++;

      }
    }, error => {
      console.log("error")
    });
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(AnunciosPage, {
      item: item
    });
  }
}
