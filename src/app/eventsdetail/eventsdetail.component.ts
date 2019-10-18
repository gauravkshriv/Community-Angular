import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {QuestionService} from '../services/question.service';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { StateService} from '../services/state.service';
import { AgmCoreModule } from '@agm/core';
// import {} from 'googlemaps';    // is mandatory pls don't remove
import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
const swal: SweetAlert = _swal as any;
import { SweetAlert } from 'sweetalert/typings/core';
import * as _swal from 'sweetalert';
@Component({
  selector: 'app-eventsdetail',
  templateUrl: './eventsdetail.component.html',
  styleUrls: ['./eventsdetail.component.css']
})
export class EventsdetailComponent implements OnInit {
  eventdata:any;
  uuid:any;
  // lat:number= 75.23374779999995;
  // lng:number= 26.6836462;
  lat:any ='';
  lng:any ='';
  zoom: number;
  location:object;
  inviterequestdetail:any;
  Jointdata:any;
  eventId:any;
  eventcategory:any; 
  userlist:any=this.detailuser.eventsdetail;
  invitedetail:any;
  username:any;
  commentinput:any;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  constructor(private mapsAPILoader: MapsAPILoader,  private ngZone: NgZone, private router: Router, private http: HttpClient, private ds: DataService, private activatedRoute: ActivatedRoute, private questionService: QuestionService,private detailuser:StateService)
   { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.uuid=localStorage.getItem('uuid');
    this.username=localStorage.getItem('username');
    this.eventdata=null;
   
   }
 
   ngOnInit() {
    this.zoom = 12;
    this.eventId = this.activatedRoute.snapshot.queryParams['eventId'];
    console.log('???????????????????????????????????????????????????????????????????????????',this.eventId);
    this.eventcategory = this.activatedRoute.snapshot.queryParams['eventcategory'];
    console.log('???????????????????????????????????????????????????????????????????????????',this.eventcategory);
    this.getEvent(this.eventId);
   this.setCurrentPosition();
   

    this.getEnviteeDetail();
    this.getEnviteeRequestDetail();
    // this.latitude=this.eventdata.latituade;
    // this.longitude=this.eventdata.longitude;

    // this.eventcategory = true;
    // console.log("check event true working",this.detailuser.eventsdetail);
    // this.getJointEvent(eventId); 
  }

  

  // OnchoseLocation(event)  
  // {
  //   this.latitude = 
  //   this.longitude = event.coords.lng;
  //   this.locationChosen=true;
  // }
  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 5;
      });
    }
  }
 

  getEvent(eventId) {
    this.questionService.getEventById(eventId,this.uuid)
      .subscribe((data: any) => {
        console.log('=======================>event all data',data);
      
          this.eventdata = data;
          console.log("this.eventdata.longitude",this.eventdata.longitude,data.latitude);  //latitude
          this.lng= this.eventdata.longitude;
          this.lat= this.eventdata.latitude;
          console.log("check lat",this.lat);
          console.log("check lng",this.lng);
          // this.zoom = 12;
        },
        error => {
          if (error.error.msg[0] == undefined) {
            swal('Error', 'Some Error Occurred');
            return;
          } else {
            swal('Error', error.error.msg[0]);
            return;
          }
        }
      );
  }




  postcommentuserevent(eventId)
  {
    let body = {
      'eventId': parseInt(eventId),
      'uuid': this.uuid,  
      'comment':this.commentinput
      };
      this.questionService.postcommentbyuser(body)
        .subscribe((data: any) => {
          console.log('=======================>Jointdata all data',data);
            this.Jointdata = data;   
            swal({
              title: "Thank You!",
              text: "You have successfully commented",
              icon: "success",
              // button: false,
              //closeOnClickOutside: false
            })
            .then(()=>{
              $('#inputText').val('');  
              this.getEvent(eventId);

            });
           
           
          },
          error => {
            if (error.error.msg[0] == undefined) {
              swal('Error', 'Some Error Occurred');
              return;
            } else {
              swal('Error', error.error.msg[0]);
              return;
            }
          }
        );
  }

  //////////////////////////////////////

  getConfirmRequestInvitee(eventId, rid, APPROVAL) {
    //let APPROVAL="CONFIRM"; 
   
    console.log("eventId>>>>>>>>>>>>>>>>>>>>>",eventId)
    this.questionService.getConfirmRequest(eventId,rid,this.uuid,APPROVAL)
      .subscribe((data: any) => {
        console.log('=======================>Jointdata all data',data);
          this.Jointdata = data;      
          swal({
            title: "Thank You!",
            text: "Requested Invitee confirmation changed Succesfully",
            icon: "success",
            // button: false,
            //closeOnClickOutside: false
          })
          console.log($("#rest"+rid));
          $("#rest"+rid).parent().hide(); 
         
        },
        error => {
          if (error.error.msg[0] == undefined) {
            swal('Error', 'Some Error Occurred');
            return;
          } else {
            swal('Error', error.error.msg[0]);
            return;
          }
        }
      );
  }

///////////////////////////////////////////

// Sendattach(eventId)
// {
//   console.log("eventId",eventId);
//   this.router.navigate(['/events/add'],{replaceUrl:true});
// }

  //////////////////////////////////////

  getJointEvent(eventId) {
    
    console.log("eventId>>>>>>>>>>>>>>>>>>>>>",eventId)
    this.questionService.getJointEventById(eventId,this.uuid)
      .subscribe((data: any) => {
        console.log('=======================>Jointdata all data',data);
        swal({
          title: "Thank You!",
          text: "Your requested has been sent.",
          icon: "success",
          // button: false,
          //closeOnClickOutside: false
        })
      

          this.Jointdata = data;
        },
        error => {
          if (error.error.msg[0] == undefined) {
            swal('Error', 'Some Error Occurred');
            return;
          } else {
            swal('Info', error.error.msg[0]);
            return;
          }
        }
      );
  }

///////////////////////////////////////////


  
getEnviteeDetail() {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  this.http.get('https://apicomm.rmehub.in/rmehub/forumdiscussion/events/'+ this.eventId +'/invitees?uuid='+this.uuid)
  .subscribe(
      (data) => {
        console.log('=======================>all invitee data', data)
        this.invitedetail=data;
        }, //For Success Response
      (err) => {
      console.log("got error",err)
        } //For Error Response
  );
}

///////////////////////////////


getEnviteeRequestDetail() {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  this.http.get('https://apicomm.rmehub.in/rmehub/forumdiscussion/events/'+ this.eventId +'/inviteesRequested?uuid='+this.uuid)
  .subscribe(
      (data) => {
        console.log('=======================>all invitee request data', data)
        this.inviterequestdetail=data;
        }, //For Success Response
      (err) => {
      console.log("got error",err)
        } //For Error Response
  );
}

///////////////////////////////



}
