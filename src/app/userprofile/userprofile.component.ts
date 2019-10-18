import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingService} from '../services/load.service';
import {EnumdataService} from  '../services/enumdata.service';
import { SocketService } from '../services/socket.service';
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  username:any;
  uuid:any;
  lod:any;
  sessiontoken:any;
  profiledata:any;
  lastlogoutime:any;
  jwttoken:any;
  puuid:any;
  onlineusers = [];
  offlineusers = [];
  sub:any;
  onlinestatus=false;
  constructor(private socketservice:SocketService,private http: HttpClient, private router: Router,private route: ActivatedRoute,private Loading:LoadingService, private enumservice : EnumdataService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.uuid = localStorage.getItem("uuid");
    this.username= localStorage.getItem("username");
    this.sessiontoken = localStorage.getItem("sessiontoken");
    this.jwttoken = localStorage.getItem("jwttoken");
   }

  ngOnInit() {
    // this.puuid = this.activatedRoute.snapshot.queryParams['puuid'];
    this.sub = this.route.params.subscribe(params => {
      this.puuid = params['uuid'];
      console.log("this.puuid",params);
    })

    console.log('???????????????????????????????????????????????????????????????????????????',this.puuid);
    this.GetUSerProfile();
    this.lod= this.Loading._loading=true;

    // console.log("socketdata");
    this.socketservice.socket.emit('getOnlineUsers',null);
    this.socketservice.socket.on('onlineUsers',(data)=>{
      console.log("data online user",data);
      this.onlineusers = data.onlineUsers;
      this.offlineusers = data.AllUsers;
      
      console.log("this.offlineusers",this.offlineusers);
      console.log('socketdata//////',this.onlineusers);
      if(this.onlineusers.length){
        console.log("data available");
       var row =  this.onlineusers.find(x=>x.userId == this.puuid)
       if(row){
       this.onlinestatus = true;
       }
       else{
         this.onlinestatus = false;
         var offline = this.offlineusers.find(x=>x.userId == this.puuid);
         console.log("this.offlineusers",offline);
        //  if(typeof offline.lostLogout == "undefined" && offline.lostLogout && offline.lostLogout != null )
        //  {
          this.lastlogoutime = new Date(offline.lostLogout).toLocaleString();
        //  }
        
       }
       console.log("this.onlinestatus",this.onlinestatus)

      }
      
    })
    this.socketservice.socket.on('userSet', (data : any)=> {
      console.log("userset",data);
      if(data.error)
      {
        console.log(data.error);
        window.location.reload;
      }
      if(data.userData.userId === this.puuid)
      {
        this.onlinestatus = true;
      }

    
    });
    
  }

  GetUSerProfile(){
    console.log("User Valid profile ..........")
       const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Token ' + this.jwttoken
        })
       };
       let body = {
        'puuid':this.puuid,
       'uuid': this.uuid,
       "sat" : this.sessiontoken
      };
      console.log("this is------>",body)
   
      this.http.get('https://api.rmehub.in/api/user/profile?uuid='+this.uuid+'&puuid='+this.puuid+'&sat='+this.sessiontoken, httpOptions)
       .subscribe(
       (data) => {
        this.lod= this.Loading._loading=false;
           this.profiledata = data;
       console.log("user profile  data",this.profiledata);
           
        var tempArray=[];
        this.profiledata._occ.forEach(v => {
          tempArray.push(this.enumservice.kytname.get(v))
          console.log("v",v);
        });
      
        this.profiledata._occ = tempArray;

        tempArray=[];
        this.profiledata._ptype.forEach(v => {
          tempArray.push(this.enumservice.kytname.get(v))
        });
        this.profiledata._ptype = tempArray;

        tempArray=[];
        this.profiledata._splz.forEach(v => {
          tempArray.push(this.enumservice.kytname.get(v))
        });
        this.profiledata._splz = tempArray;


        tempArray=[];
        this.profiledata.market.forEach(v => {
          tempArray.push(this.enumservice.kytname.get(v))
        });
        this.profiledata.market = tempArray;


           console.log("=============================>",this.profiledata);
          }, //For Success Response
             (err) => {
             console.log("got error",err)
         //self.serverDataLogin=err;
           } //For Error Response
         );
  }

}
