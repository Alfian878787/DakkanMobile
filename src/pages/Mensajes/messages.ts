import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import {ChatPage} from "../Chat/chat";

@Component({
  selector: 'page-list',
  templateUrl: 'messages.html'
})
export class MessagesPage {
  socket:any = null;
  me: any;
  name:any;
  chats : any;


  constructor( public http: Http,public storage: Storage,public navCtrl: NavController, public navParams: NavParams) {

    this.storage.get('user').then((data) => {
      this.me = data.name;
      if(data != null) {
        var data2={
          userid: data._id
        };
        this.http.post("http://147.83.7.156:3500/rooms",data2).map(res => res.json()).subscribe(
          result => {
            let chat;
            let chats1=[];
            for(var i=0;i<result.length;i++){
              if(result[i].buyer==this.me){
                chat={_id : result[i]._id,
                  name :result[i].name,
                  advname : result[i].advname,
                  advurl : result[i].advurl,
                  chats : result[i].chats,
                  sellername : result[i].sellername,
                  user1 : result[i].user1,
                  user2 : result[i].user2,
                  buyer : result[i].buyer,
                  chatnombre:result[i].sellername,
                  sellert:false}
                chats1.push(chat);
              }
              else{
                chat={_id : result[i]._id,
                  name :result[i].name,
                  advname : result[i].advname,
                  advurl : result[i].advurl,
                  chats : result[i].chats,
                  sellername : result[i].sellername,
                  user1 : result[i].user1,
                  user2 : result[i].user2,
                  buyer : result[i].buyer,
                  chatnombre:result[i].buyer,
                  sellert:true}
                chats1.push(chat);
              }
            }
            this.chats = chats1;
          }, error => {
            console.log("error")
          });
      }
    });
  }
  chatdetail(chat){
    this.navCtrl.push(ChatPage,{chat:chat})
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
