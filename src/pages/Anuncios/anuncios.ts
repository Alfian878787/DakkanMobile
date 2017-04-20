import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {AnuncioPage} from '../Anuncio/anuncio';

@Component({
  selector: 'page-list',
  templateUrl: 'anuncios.html'
})
export class AnunciosPage {
  items: Array<{title: string}>;
  grid: Array<Array<string>>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {

    this.items = [];
    http.get("http://10.193.155.95:3500/allAdvs").subscribe(data => {

      this.grid = Array(Math.ceil(data.json().length/2)); //MATHS!
      let rowNum = 0;

      for(let i=0;i<data.json().length;i+=2) {
        this.grid[rowNum] = Array(2);
        if (data.json()[i]) {

          this.grid[rowNum][0] = data.json()[i]
        }
        if(i+1 < data.json().length){
          this.grid[rowNum][1] = data.json()[i + 1]
        }
        rowNum++;

      }
    }, error => {
      console.log("error")
    });
  }

  detalle(image){
    this.navCtrl.push(AnuncioPage,{adv:image})

  }


}
