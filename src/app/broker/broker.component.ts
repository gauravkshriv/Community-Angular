import { Component, OnInit } from '@angular/core';
import {RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router} from '@angular/router';
import {LoadingService} from '../services/load.service';
import {ActivatedRoute} from '@angular/router';
import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';
import { EnumdataService } from '../services/enumdata.service';
import { QuestionService } from '../services/question.service';

const swal: SweetAlert = _swal as any;
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.css']
})
export class BrokerComponent implements OnInit {
  data:any;
  userlist=[];
    statenam:any;
    objectKeys: any
    rating:any;
    filterdata:any;
    username:any;
    profileimg:any;
    filter:any;
    flag:boolean=true;
    location:any;
  occupation:any;
  page:any;
  size:any;
  apploadings:any;
  lod:any;
  objLoaderStatus: boolean;
  // public _loading: boolean = false;
  
    constructor(private http: HttpClient,
       private router: Router, 
       private Loading:LoadingService, 
       private enumservice:EnumdataService,
       private questionservice:QuestionService)
     {
      // this.objectKeys = Object.keys;
      
     }
  
  
  
    ngOnInit()
    {
     
      this.lod= this.Loading._loading=true;
      console.log("loading----->",this.lod);
      this.loadData(1);
    }
  
  
    myFunction() {
      var x = document.getElementById("framemodel_box");
      if (x.style.display === "none") {
          x.style.display = "block";
      } else {
          x.style.display = "none";
      }
  }
  
  
  
   loadData(page){
    $(window).scrollTop({scrollTop:0}, 5000);
    // $(window).animate({scrollTop:$(window).get(0).scollHeight},1000);
  
    
      console.log("User Valid landowner ..........")
    this.occupation = "BROKING_CONSULTANT";
    this.location = "India";
    this.page = page;
    this.size= 10;
    this.rating = "0-5";
    // let qparam = "occupation="+this.occupation+",location="+this.location+",rating="+this.rating+"&page="+this.page+"&size="+this.size+"";  
   
    this.questionservice.getFilter(this.occupation,this.location,this.rating,this.page,this.size)
       .subscribe(
       (data) =>  {
        this.lod= this.Loading._loading=false;
        console.log("loading----->",this.lod);
        this.filterdata = data;
  
        // array.forEach(element => {
          
        // });
        // var userlist = [];
           
        var tempArray=[];
        this.filterdata.userList.forEach(v => {
          var user = {
            name:'',
            uuid:'',
            userName:'',
            profileurl:'',
            location:'',
            Occupation:[],
            specialization:[]
          };  
          user.name = v.rmeUserDetails.firstName + ' ' + v.rmeUserDetails.lastName;
          user.location = v.rmeUserDetails.location;
          user.profileurl = v.profilePic;
          user.userName = v.userName;
          user.uuid = v.uuid;
          v.rmeUserDetails.rmeUserOccupation.forEach(occc => {
            if(occc.occupation==null)
            {
              user.Occupation.push("None");
            }
            else{
              user.Occupation.push(this.enumservice.kytname.get( occc.occupation))
            }
           
          });
  
          v.rmeUserDetails.rmeUserSpecialization.forEach(spezi => {
            if(spezi.specialization==null)
            {
              user.specialization.push("None");
            }
            else{
              user.specialization.push(this.enumservice.kytname.get( spezi.specialization))
            }
          });
  
          // tempArray.push(this.enumservice.kytname.get(v))
          this.userlist.push(user);
        });
        console.log("tempArray",this.userlist);
        //  this.profileimg= this.landowner.profilepicture;
        console.log("user display landowner", this.filterdata);
  
      //  this.data.forEach(data => {
      //   console.log(data); 
      //  });
  
        // var count_=0;
        // this.landowner.userList.forEach(element => {
        //   console.log("user display landowner " + count_, element.profilePic);
        //   count_++;
        // });
         
            // console.log("===========check",this.flag);
       }, //For Success Response
          (err) => {
          swal("got error",err);
       //   self.serverDataLogin=err;
        } //For Error Response
         );
   
    //  this.isLoading=false;
   }
  
   certif()
   {
     $('.filters').addClass('filterback')
    //  $('#tab1').toggle();
     $("#tab1").fadeIn(500);
     $('#tab2').fadeOut();
     $('#tab3').fadeOut();
     $('#tab4').fadeOut();
   }
   locat()
   {
    $('.filters').addClass('filterback')
     $('#tab2').fadeIn(500);
     $('#tab1').fadeOut();
     $('#tab3').fadeOut();
     $('#tab4').fadeOut();
   }
  
   mark()
   {
    $('.filters').addClass('filterback')
     $('#tab3').fadeIn(500);
     $('#tab1').fadeOut();
     $('#tab2').fadeOut();
     $('#tab4').fadeOut();
   }
  
   pop()
   {
    $('.filters').addClass('filterback')
    $('#tab4').fadeIn(500);
    $('#tab1').fadeOut();
    $('#tab3').fadeOut();
    $('#tab2').fadeOut(); 
   }
  
  
  }
  
