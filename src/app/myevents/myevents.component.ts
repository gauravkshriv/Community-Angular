import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import {RequestOptions, Headers, Response } from '@angular/http';
import {LoadingService} from '../services/load.service';
import { Router} from '@angular/router';
import { StateService} from '../services/state.service';
@Component({
  selector: 'app-events',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.css']
})
export class EventsComponent implements OnInit {
  showevent:any;
  userevent:any;
  uuid:any;
  lod:any;
  jwttoken:any;
  show: boolean = localStorage.getItem("userLoginStatus")  == "true" ? true : false;
  constructor( private http: HttpClient, private router: Router, private Loading:LoadingService, private detailuser:StateService) { 
    this.uuid = localStorage.getItem("uuid");
    this.jwttoken = localStorage.getItem("jwttoken");
  //  this.detailuser.eventsdetail=true;
  }

  ngOnInit() {
    
    // this.lod= this.Loading._loading=true;
this.GetUserEvent();
const jjj= window.location;
console.log("check url",jjj.href)
// window.location.href=jjj+'/tab';

  }

  pastevent()
  {
    alert("check");
  }

  
  
 GetUserEvent(){
  console.log("user registration clicked")
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + this.jwttoken
    })
  };
let confirm="CONFIRM"
  this.http.get ('http://rmecommunity.us-east-2.elasticbeanstalk.com/api/rmehub/forumdiscussion/events/getApprovedEventsOfUser?uuid='+this.uuid+'&approval='+confirm,httpOptions)
  .subscribe(
      (data) => {
        this.userevent= this.Loading._loading=false;
         console.log("user event data successful verify", data)
        this.showevent=data;
      }, //For Success Response
      (err) => {
  //     console.log("got error",err)
      } //For Error Response
  );
 }

}
