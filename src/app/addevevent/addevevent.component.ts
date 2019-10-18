import { Component, OnInit } from '@angular/core';
import {UtilService} from '../services/util.service';
import {RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
// import {} from '@types/googlemaps';
import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-addevevent',
  templateUrl: './addevevent.component.html',
  styleUrls: ['./addevevent.component.css']
})
export class AddeveventComponent implements OnInit {

  
  selectedFile = null;
  fileToUpload = null;
  images:any = [];
  files:any=[];
  allfiles:any=[];
  allgalleryfiles:any=[];
  eventId:any;
  event:any;
   res:any;
   addevent:any;
   place:any;
   invitee:any=[];
  uuid:any;  
  jwttoken:any
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor( private utilService: UtilService, private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) 
  { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.uuid= localStorage.getItem("uuid");
    this.jwttoken = localStorage.getItem("jwttoken");
  }

 
  ngOnInit() { 
    this.eventId = this.activatedRoute.snapshot.queryParams['eventId'];
console.log("eventIdasas",this.eventId);
 
  }


fileuploads(event){
  this.files = event.target.files;
  console.log(this.files);
  if(this.files)
  {
    for(let i=0; i<this.files.length; i++){
      const image= {
        name:"",
        type:"",
        size:"",
        url:""
      };
      this.allfiles.push(this.files[i]);
      image.name=this.files[i].name;
      image.type=this.files[i].type;
      image.size=this.files[i].size;



 // show image preview
      const reader = new FileReader();
      reader.onload=(filedata)=>{
        image.url = reader.result + "";
        this.images.push(image);
      };
      reader.readAsDataURL(this.files[i]);

///////////////////
    }
  }
  event.srcElement.value = null;
}

//////////////

fileGalleryuploads(event){
  this.files = event.target.files;
  console.log(this.files);
  if(this.files)
  {
    for(let i=0; i<this.files.length; i++){
      const image= {
        name:"",
        type:"",
        size:"",
        url:""
      };
      this.allgalleryfiles.push(this.files[i]);
      image.name=this.files[i].name;
      image.type=this.files[i].type;
      image.size=this.files[i].size;



 // show image preview
      const reader = new FileReader();
      reader.onload=(filedata)=>{
        image.url = reader.result + "";
        this.images.push(image);
      };
      reader.readAsDataURL(this.files[i]);

///////////////////
    }
  }
  event.srcElement.value = null;
}


deleteImage(image:any){

  const index = this.images.indexOf(image);
  this.images.splice(index,1);
  this.allfiles.splice(index,1);
}
// register event

AddEvent(){
  console.log("user registration clicked")
  const httpOptions = {
    			headers: new HttpHeaders({
    				//  'Content-Type':  'application/json',
             'Authorization': 'Token ' + this.jwttoken}
             )};
//  let usertypedta = this.inviteeArr.join(",")
let body = new FormData();
body.append('gallery',this.allgalleryfiles);
body.append('attachement',this.allfiles),
body.append('eventId',this.eventId),
body.append('uuid',this.uuid),
body.append("invitee",this.invitee),
console.log("=========================================================================>", body);
this.http.post('https://apicomm.rmehub.in/api/rmehub/forumdiscussion/events/addInviteeOrAttachmentToEvents', body, httpOptions)
.subscribe(
    (data) => {
      console.log("successful verify", data)
      this.addevent=data;
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
     
};



//////////////////////////////////////
 
};
