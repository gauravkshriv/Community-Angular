import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import {RequestOptions, Headers, Response } from '@angular/http';
import {LoadingService} from '../services/load.service';
import { Router} from '@angular/router';
import { StateService} from '../services/state.service';
import {QuestionService} from '../services/question.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  showevent:any;
  showannounce:any;
  lod:any;
  newdate:any;
  showadmindata:any;
  uuid:any;
  jwttoken:any;
  show: boolean = localStorage.getItem("userLoginStatus")  == "true" ? true : false;
  constructor( private http: HttpClient, private router: Router, private Loading:LoadingService, private detailuser:StateService, private questionService: QuestionService) {
    this.uuid= localStorage.getItem("uuid");
    this.jwttoken = localStorage.getItem("jwttoken");
    this.detailuser.eventsdetail=false;
 
   }

  ngOnInit() {
    // this.lod= this.Loading._loading=true;
    this.GetEventByAdmin();

  }

  GetEventByAdmin()
  {
    this.questionService.getEventsByAdminorMentor(this.uuid)
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
