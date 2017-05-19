import {Component, ViewChild,NgZone} from '@angular/core';
import { Storage } from '@ionic/storage';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import * as io from 'socket.io-client';
import {Http} from "@angular/http";

@Component({
  selector: 'page-list',
  templateUrl: 'chat.html',
  queries: {
    txtChat: new ViewChild('txtChat'),
    content: new ViewChild('content')
  }
})
export class ChatPage {
  socket:any = null;
  chats : any;
  sellert:boolean;
  room : any;
  messages:any;
  message:string;
  constructor(private toastCtrl: ToastController,private zone: NgZone,public http: Http,public storage: Storage,public navCtrl: NavController, public navParams: NavParams) {

    this.socket = io('http://147.83.7.156:3000');

   this.chats =  navParams.get('chat').chats;
   this.room = navParams.get('chat').name;
   this.sellert = navParams.get('chat').sellert;
    let zn = this.zone;
    let sk = this.socket;
    let ch = this.chats;
    let room = this.room;
    this.socket.on('connect', function () {
      console.log(room);
      // Connected, let's sign-up for to receive messages for this room
      sk.emit('room', room);
    });
    this.socket.on('messages', function (data) {
      zn.run(() => {
        ch.push(data);
      });
    });

  }

  send(message) {
    this.storage.get('user').then((data) => {
      var payload = {
        author: data.name,
        text: this.message
      };
      this.message = "";
      console.log(payload);
      this.socket.emit('newmsg', payload);
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
  treatdone(){
    var data=({
      chat:this.room,
      buyer: this.navParams.get('chat').buyer,
      seller:this.navParams.get('chat').sellername,
      closed:true
    });
    this.http.post("http://147.83.7.156:3500/treatdone",data).map(res =>{
      let response = res.text();
      if(response =="ok"){
        this.goodToast("Trato cerrado correctamente");
        this.sellert = false;
      }
      else{
        this.sellert = true;
      }
    }).subscribe();
  }
}
