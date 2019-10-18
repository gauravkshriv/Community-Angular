import { Component, OnInit } from '@angular/core';
import {RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
showNav = true;
public customerData : any;
public searchText : string;
      email:any;
       ipvalue:any;
       profiledata:any;
       serverData:any;
       editemail:any;
       serverDataLogin:any;
       invalidUser:any;
       isLoginSuccess: boolean;
       username:any;
       otp:any;
       country:any;
       res:any;
       uuid:any;
       editotp;
       id:number;
       _data=[];
       lastname:any; 
       sessiontoken:any;
       firstname;any;
       jwttoken:any;
       state:any;
       data_edit:object = {};
      
      constructor (private http: HttpClient, private route: ActivatedRoute, private router: Router)
      {
    this.uuid= localStorage.getItem("uuid");
    this.sessiontoken = localStorage.getItem("sessiontoken");
    this.jwttoken = localStorage.getItem("jwttoken");

      }

ngOnInit() 
{
  $("#myModal2").modal({
    keyboard: false,
    backdrop: 'static'
});

$("#myModal3").modal({
  show: false,
  backdrop: 'static'
});


        this.GetUser();
        this.State();
}
        

State() {
  return this.http.get('./assets/state.json').subscribe(
    data => {
       this.state = data;	 
      //  this.userlisting();
       console.log(">>>>>>>>================>>>>>>>>>>>",this.state);
     },
     (err) => {
       return err;
      // console.log("got error",err);
       
     }
   );
   
}

userlisting(event)
{
  console.log("event",event);
  this.state;
}


// get user
GetUser(){
console.log("User Valid profile ..........")
           const httpOptions = {
         headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Token ' + this.jwttoken
            })
           };
           let body = {
           'uuid': this.uuid,
           "sessionToken" : this.sessiontoken
          };
          console.log("this is------>",body)

           var self=this;
           this.http.post('https://api.rmehub.in/api/getuser', body, httpOptions)
           .subscribe(
            (data) => {
              this.profiledata = data;
              console.log("successful verify", data);
            }, //For Success Response
                 (err) => {
                 console.log("got error",err)
                 self.serverDataLogin=err;
               } //For Error Response
             );
            }


  countrys(data){
    
    if(!this._data.includes(data))
      this._data.push(data);
    else
      this._data.splice(this._data.indexOf(data),1);
    // console.log("====================>",this._data.toString());
    console.log("====================>",this._data);
    this.country = [this.country]+data +', ';
    console.log("this.country",this.country);

    


    // console.log("check=== localtion",  this.country);
  //   let count1=this.country
  //  console.log( "...........................>",typeof(count1)
    // swal("country name"+this.country);
  }
    
      // update profile 
  UpdateProfile(){

    console.log("User Valid profile ..........")
    const httpOptions = {
  headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': 'Token ' + this.jwttoken
     })
    };
   
    let body = {
    'uuid': this.uuid,
    'firstname' : this.profiledata.firstname,
    'lastname' : this.profiledata.lastname,
    'userName' : this.profiledata.username,
    'country' : this.country

   }; 
   console.log("this is------>",body)

    var self=this;
    this.http.put('https://api.rmehub.in/api/editProfile', body, httpOptions)
    .subscribe(
     (data) => {
       this.profiledata = data;
       console.log("successful verify", data);
     }, //For Success Response
          (err) => {
          console.log("got error",err)
          self.serverDataLogin=err;
        } //For Error Response
      );

  }

  // Edit Email Function start
       EditEmail()
      {
        console.log("User Valid email ..........")
           const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Token ' + this.jwttoken
            })
           };
           let body = {
           'email': this.email,
           "uuid" : this.uuid
           
          };
          console.log("this is------>",body)
         console.log("jwt token is", this.jwttoken);
         if(this.email=="")
         {
           swal("please enter Email Address");
         }
         else if(this.email=="/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/")
         {
           swal("please Enter calid Email");
         }
         else {
           var self=this;
           this.http.post('https://api.rmehub.in/api/user/updateEmail', body, httpOptions)
           .subscribe(
           (data) => {
               self.editemail = data;
               console.log("response getting", this.editemail);
               if(this.editemail.exception==="EMAIL_ADDRESS_EXIST")
               {
                 swal("Email Already Exist !");
               }
               else if(this.editemail.exception==="FIELD_CAN_NOT_BE_EMPTY")
               {
                 swal("Please Enter New Email ID");
               } 
               else if(this.editemail.exception==="EMAIL_NOT_VALID")
               {
                 swal("Enter Valid Email");
               } 
               else if(this.editemail.successCode==="OTP_SEND_ON_EMAIL")
               {
               
                 $('#myModal1').modal('hide');  
                 $('#myModal2').modal('show');
               }
               else
               console.log("successful verify", data);
                }, //For Success Response
                 (err) => {
                 console.log("got error",err)
                 self.serverDataLogin=err;
                // self.setLogin(false);
                // this.router.navigate(['/register']);
               } //For Error Response
             );
            }
            
      }

// OTP submit function start 

      OtpSubmit(){
        console.log("User Valid Login ..........")
        const httpOptions = {
         headers: new HttpHeaders({
           'Content-Type':  'application/json',
           'Authorization': 'Token ' + this.jwttoken
         })
        };
        let body = {
        'otp': this.otp,
        "uuid" : this.uuid
        };
        if(this.otp=="")
        {
          swal("please enter OTP Password");
        }
        else {
       console.log("this is------>",body)
      console.log("jwt token is", this.jwttoken);
        var self=this;
        this.http.post('https://api.rmehub.in/api/user/verifyEmailOtp', body, httpOptions)
        .subscribe(
        (data) => {
            self.editotp = data;
            console.log("response getting", this,this.editotp);
            if(this.editotp.exception==="OPT_DONT_EXIST")
            {
              swal("OTP does not exist !");
            }
            else if(this.editotp.exception==="OTP_NOT_VALID")
            {
              swal("OTP not valid");
            }
            else if(this.editotp.exception==="EMAIL_ADDRESS_ALREADY_EXIST")
            {
              swal("Email Address Already Exist");
            }
            else if(this.editotp.exception==="FIELD_CAN_NOT_BE_EMPTY")
            {
              swal("Please Enter OTP Pin");
            }
            else if(this.editotp.exception==="OTP_NOT_MATCH")
            {
              swal("OTP does not match");
            }
            else if(this.editotp.exception==="UPDATE_EMAIL_SUCCESS")
            {
              $('#myModal2').modal('hide'); 
              $('#myModal3').modal('show');
            }
            else
               {
                 //trigger next modal
            
               }
           }, //For Success Response
              (err) => {
              console.log("got error",err)
              self.serverDataLogin=err;
            } //For Error Response
          );
      }
    }

// OTP function end


  }


