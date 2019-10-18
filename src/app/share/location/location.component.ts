import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';    // is mandatory pls don't remove
import { FormControl } from '@angular/forms';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import {} from '@types/googlemaps';
import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  data:any;
  latitude: any;
 longitude: any;
 searchControl;
 place:any;
 zoom: number;
  state_s:any;
statenam:any;
questionvalue:any;
@ViewChild("search")
public searchElementRef: ElementRef;
  constructor(private http: HttpClient, private router: Router, private state: StateService,private mapsAPILoader: MapsAPILoader,  private ngZone: NgZone) { }

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
      types: ["address"]
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

 setCurrentPosition() {
  console.log("check setCurrentPosition");
  if ("geolocation" in navigator) {
    
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 12;
    });
  }
}

 cross()
 {
   $("#tab2").fadeOut();
   console.log("check tab 2 location cross")
   $('.filters').removeClass('filterback');
 }

}
