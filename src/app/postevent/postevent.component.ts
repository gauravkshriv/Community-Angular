import { Component, OnInit } from '@angular/core';
import {UtilService} from '../services/util.service';
import {RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';    // is mandatory pls don't remove
import { FormControl } from '@angular/forms';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import {} from '@types/googlemaps';
import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-postevent',
  templateUrl: './postevent.component.html',
  styleUrls: ['./postevent.component.css']
})
export class PosteventComponent implements OnInit {

 
  latitude: any;
 longitude: any;
 searchControl;
 zoom: number;
  selectedFile = null;
  fileToUpload = null;
  images:any = [];
  imagesg:any = [];
  files:any=[];
  allfiles:any=[];
  allgalleryfiles:any=[];
  questionvalue:any;
  event:any;
   res:any;
   speaker:any;
   location:any;
   category:any;
   google:any;
   endDate:any="";
   startDate:any="";
   description:any;
   address:any;
   organizer:any;
   addevent:any;
   place:any;
   invitee:any=[];
   eventStartTime:any="";
   eventEndTime:any="";
  meridian = true;
  uuid:any;
  public Editor = ClassicEditor;
  propertyTypes:Array<string> = ["WEBINAR", "SEMINAR"];
  
  jwttoken:any
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,  private ngZone: NgZone, private utilService: UtilService, private calendar: NgbCalendar, private http: HttpClient, private router: Router) 
  { 
    this.uuid= localStorage.getItem("uuid");
    this.jwttoken = localStorage.getItem("jwttoken");
  }

 
  ngOnInit() {
  //set google maps defaults
  this.zoom = 4;
  this.latitude = 39.8282;
  this.longitude = -98.5795;

  //create search FormControl
  this.searchControl = new FormControl();

  //set current position
  

  //load Places Autocomplete
  this.mapsAPILoader.load().then(() => {
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: []
    });
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let tempPlace: google.maps.places.PlaceResult = autocomplete.getPlace();
        this.place=tempPlace;
        // let tempPlace: google.maps.places.lo;
        // this.place=tempPlace;
        console.log("places", this.place.name)
        console.log("places", this.place)

        //verify result
        if (this.place.geometry === undefined || this.place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = this.place.geometry.location.lat();
        this.longitude = this.place.geometry.location.lng();
        console.log("latitude",this.latitude);
        console.log("longitude",this.longitude);
        this.zoom = 15;
      });
    });
  });
  }
///// end ng oninint
 
setCurrentPosition() {
  console.log("check setCurrentPosition");
  if ("geolocation" in navigator) {
    
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 12;
    this.getCurrentLocation();
    });
  }
}

getCurrentLocation() {
  console.log("check getCurrentLocation");
  this.mapsAPILoader.load().then(() => {
    let geocoder = new google.maps.Geocoder;
    let latlng = {lat: this.latitude, lng: this.longitude};
    console.log("latlng",latlng);
    // let that = this;
    geocoder.geocode({'location': latlng}, function(results) {
        if (results[0]) {
          this.zoom = 11;
          this.currentLocation = results[0].formatted_address;
          console.log("formatted_address",results);
          console.log('that.currentLocation',this.currentLocation);
        } else {
          console.log('No results found');
        }
    });
  });
}
currentLocation:any;

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
        this.imagesg.push(image);
      };
      reader.readAsDataURL(this.files[i]);

///////////////////
    }
  }
  event.srcElement.value = null;
}

deleteImagegallery(image:any){

  const index = this.imagesg.indexOf(image);
  
  this.imagesg.splice(index,1);
  this.allfiles.splice(index,1);
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
let description = document.getElementsByClassName('ck ck-content ck-editor__editable ck-rounded-corners ck-blurred ck-editor__editable_inline').item(0).innerHTML;
 this.startDate = this.startDate.day +'-'+this.startDate.month +'-'+this.startDate.year; 
 this.endDate = this.endDate.day +'-'+this.endDate.month +'-'+this.endDate.year; 
 this.eventEndTime = this.eventEndTime.hour+':'+this.eventEndTime.minute;
 this.eventStartTime = this.eventStartTime.hour+':'+this.eventStartTime.minute;
//  let usertypedta = this.inviteeArr.join(",")



let body = new FormData();
body.append('gallery',this.allgalleryfiles);
body.append('attachement',this.allfiles);
body.append('uuid',this.uuid);
body.append('event',this.event),
body.append('speaker',this.speaker);
body.append('location',this.place.name);
body.append('startDate',this.startDate);
body.append('endDate',this.endDate);
body.append('description',description);
body.append('address',this.address);
body.append('longitude',this.longitude);
body.append('latitude',this.latitude);
body.append("invitee",this.invitee);
body.append('category',this.category);
body.append('eventStartTime',this.eventStartTime);
body.append('eventEndTime',this.eventEndTime);
              
if(this.category =="" && this.event=="" && this.description=="" && this.address=="" && this.allgalleryfiles)
{
  swal({
    text: "Please fill Empty Field",
    icon: "error",
    title:"Title is Empty",
    closeOnClickOutside: false
  })
  }

console.log("==========================>", body);
this.http.post('https://apicomm.rmehub.in/api/rmehub/forumdiscussion/events', body, httpOptions)
.subscribe(
    (data) => {
      console.log("successful verify", data)
      this.addevent=data;
      this.router.navigate(['/events/myevents']);
      swal({
        title: "Thank You!!!",
        text: "Your Event has been registered, will be display soon.",
        icon: "success",
      })
      this.router.navigate(['/home']);
      }, //For Success Response
    (err) => {
    console.log("got error",err)
      } //For Error Response
);
     
};



//////////////////////////////////////
 
};

