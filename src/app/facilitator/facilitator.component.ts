import { Component, OnInit } from '@angular/core';
import {RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-facilitator',
  templateUrl: './facilitator.component.html',
  styleUrls: ['./facilitator.component.css']
})
export class FacilitatorComponent implements OnInit {

    data:any;
    state_s:any;
    statenam:any;
    uuid:any;
    objectKeys: any
    jwt:any;
    questionvalue:any;
    rating:any;
    facilitator:any;
    username:any;
    filter:any;
    location:any;
    myParams:any;
    occupation:any;
    page:any;
    size:any;

  constructor(private http: HttpClient, private router: Router,) { 
    this.jwt = localStorage.getItem("savejwt");
    this.uuid= localStorage.getItem("saveid");
    this.username=localStorage.getItem("username");
  }

  ngOnInit() 
    {
      this.GetFacilitator();
   
  }

  GetFacilitator()
  {
  console.log("<===========facilitator listng================>")
  this.occupation = "PROJECT_INVESTMENT_CONSULTANT,LEGAL_CONSULATANT,IT_CONSULTANT,MORTGAGE_CONSULTANT,ARCHITECTURE_CONSULTANT,CONSTRUCTION_CONSULTANT,PROJECT_MENTOR,PROJECT_HEAD,TRAINER";
  this.location = "India";
  this.page = 1;
  this.size= 10;
  this.rating = "0-5";
  let qparam = "occupation="+this.occupation+",location="+this.location+",rating="+this.rating+"&page="+this.page+"&size="+this.size+"";
     const httpOptions = {    
   headers: new HttpHeaders({
        'Content-Type':  'application/json', 
        'Authorization': 'Token ' + this.jwt,
      })
     };
     var self=this;
     this.http.get('https://apicomm.rmehub.in/api/user?filter='+qparam, httpOptions)
     .subscribe(
     (data) =>  {
      self.facilitator = data;
      console.log(data)
     }, //For Success Response
        (err) => {
        swal("got error",err);
      } 
      );
    }

  }

