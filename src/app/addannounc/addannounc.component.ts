import { Component, OnInit } from '@angular/core';
import {UtilService} from '../services/util.service';
import {RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router';
import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
@Component({
  selector: 'app-addannounc',
  templateUrl: './addannounc.component.html',
  styleUrls: ['./addannounc.component.css']
})
export class AddannouncComponent implements OnInit {

questionvalue:any;
title:any;
 res:any;
 speaker:any;
 category:any;
 date:any;
 description:any;
 address:any;
 subject:any;
 addevent:any;
propertyTypes:Array<string> = ["Webinar", "Seminar"];
time = {hour: 13, minute: 30};
meridian = true;

constructor(private utilService: UtilService, private calendar: NgbCalendar, private http: HttpClient, private router: Router) 
{ 

}

ngOnInit() {
}


// register event



AddEvent()
{
console.log("user registration clicked")
let headers = new Headers({'Content-Type': 'application/json'})
let options = new RequestOptions({ headers: headers});
let body = {
'title':this.title,
'subject':this.subject, 
'date':this.date,
'description':this.description,
'category':this.category,
'time':this.time


};
console.log("==========================>", body);
var self=this;
this.http.post('https://apicomm.rmehub.in/rmehub/forumdiscussion/announcements', body)
.subscribe(
  (data) => {
    console.log("successful verify", data)
    self.addevent=data;
  
    swal({
      title: "Thank You!!!",
      text: "Your Event has been registered, will be display soon.",
      icon: "success",
    })
  }, //For Success Response
  (err) => {
  console.log("got error",err)
  } //For Error Response
);

}





}
