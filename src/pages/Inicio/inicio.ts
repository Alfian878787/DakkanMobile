import { Component } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import { NavController, NavParams } from 'ionic-angular';
import {AnunciosPage} from "../Anuncios/anuncios";
@Component({
  selector: 'page-list',
  templateUrl: 'inicio.html'
})
export class InicioPage {
  name:any;
  pass:any;
  constructor(public http: Http,public navCtrl: NavController, public navParams: NavParams) {
    this.http=http;
  }

  login(){
    var data={name:this.name,password:this.pass};
  this.http.post("http://10.193.155.95:3500/login",data).subscribe(data => {
    this.navCtrl.push(AnunciosPage);
  }, error => {
   console.log("error")
  });

  }

}
