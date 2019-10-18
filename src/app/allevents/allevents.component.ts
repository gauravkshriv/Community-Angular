import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import {RequestOptions, Headers, Response } from '@angular/http';
import {LoadingService} from '../services/load.service';
import { Router} from '@angular/router';
import { StateService} from '../services/state.service';
@Component({
  selector: 'app-allevents',
  templateUrl: './allevents.component.html',
  styleUrls: ['./allevents.component.css']
})
export class AlleventsComponent implements OnInit {

  showevent:any;
  showannounce:any;
  lod:any;
  newdate:any;
  uuid:any;
  jwttoken:any;
  show: boolean = localStorage.getItem("userLoginStatus")  == "true" ? true : false;
  constructor( private http: HttpClient, private router: Router, private Loading:LoadingService, private detailuser:StateService) {
    this.uuid= localStorage.getItem("uuid");
    this.jwttoken = localStorage.getItem("jwttoken");
    this.detailuser.eventsdetail=false;
 
   }

  ngOnInit() {
    // this.lod= this.Loading._loading=true;
    this.GetEvent();

  }

  // this.newdate = Date.split("-").reverse().join("-");
  
  GetEvent(){

    let uuid = this.uuid
    let headers = new Headers({'Content-Type': 'application/json'})
  let options = new RequestOptions({ headers: headers});

  this.http.get ("https://apicomm.rmehub.in/rmehub/forumdiscussion/events/getAllApprovedEvents")
  .subscribe(
      (data) => {
        // this.lod= this.Loading._loading=false;
         console.log("see all events listing=======================>", data)
        this.showevent=data;
      }, //For Success Response
      (err) => {
  //     console.log("got error",err)
      } //For Error Response
  );
  }
  
}
