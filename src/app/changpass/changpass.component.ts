import { Component, OnInit, ɵConsole } from '@angular/core';
import {RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Router} from '@angular/router';
import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';
import { QuestionService } from '../services/question.service';
const swal: SweetAlert = _swal as any;
@Component({
  selector: 'app-changpass',
  templateUrl: './changpass.component.html',
  styleUrls: ['./changpass.component.css']
})
export class ChangpassComponent implements OnInit {
  logout:any;
  showNav = true;
      oldpassword: any;// string, any,number,object data type
      newpassword:any;
      confirmPassword:any="";
       ipvalue:any;
       title:any
       message:any;
       serverData:any;
       changepassword:any;
       serverDataLogin:any; 
       invalidUser:any;
       isLoginSuccess: boolean;
       publicIP: string;
       res:any;
       sessiontoken:any;
       uuid:any;
       jwttoken:any;
       
      constructor (private http: HttpClient, private router: Router, private questionService: QuestionService)
      {
        this.uuid= localStorage.getItem("uuid");
        this.jwttoken = localStorage.getItem("jwttoken");
        this.sessiontoken = localStorage.getItem("sessiontoken");
        // 		this.sessiontoken = localStorage.getItem("sessiontoken");
      }
      ngOnInit() {

        $('.alert-success').fadeOut(0);

      }
        
  
        //  confirmpassword(){
        //  if (this.newpassword != this.confirmpassword){
        //    swal("password do not match");
        //    console.log("password do not match");
        //    return false;
        //  }
        //  return true;
        //        }
  
  validateInpus(){
  if(this.newpassword !== undefined || this.oldpassword !== undefined ||
  this.confirmPassword !==""){
  if (this.newpassword !== this.confirmPassword){
    $('.inputText').val('');
    $('.alert-success').fadeIn();
    this.title = "Password Not Match"
    this.message =  "Dear user password not match"
      //console.log("password do not match");
      return false;
    }
    return true;
  }
  swal("Enter Valid Details");
  return false;
  }


  Logout() {
  let body = {
    'uuid': this.uuid,
    "sessionToken": this.sessiontoken
  };
  console.log("this is------>", body)

  var self = this;
  this.questionService.LogOutPortal(body)
    .subscribe(
      (data) => {
        this.logout = data;
        console.log("=============================>", this.logout);
  if(this.logout.successCode==="LOGOUT_SUCCESS")
{
  //localStorage.setItem("userLoginProfile", "false");
  localStorage.clear();
  window.location.reload();
  this.router.navigate(['/home'],{replaceUrl:true});
} 


}, //For Success Response
(err) => {
console.log("got error",err)

        } //For Error Response
);
}

cross()
{
  console.log("fadeOut");
  $('.alert-success').fadeOut();
}

ChangePass(){

        if(this.validateInpus()){
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Token ' + this.jwttoken
            })
           };
           let body = {
           'oldpassword': this.oldpassword,
           'newpassword':this.newpassword,
           "uuid" : this.uuid
          };

          console.log("this is------>",body)
         console.log("jwt token is", this.jwttoken);
 
        if(this.oldpassword == undefined || this.newpassword==undefined)
        {
          swal({
                        title: "Field is Empty!",
                        text: "Please Type input Field !!",
                        icon: "info",
                      })
                      }
        else{var self=this;
           this.http.post('http://ec2-3-19-70-172.us-east-2.compute.amazonaws.com/api/changePassword', body, httpOptions)
           .subscribe(
           (data) => {
               console.log("successful verify", data);
               this.changepassword = data;
               if(this.changepassword.exception==="INVALID_CREDENTIALS")
               {
                 swal("Please Enter New Password");
               }
               else if(this.changepassword.exception==="OLD_PASSWORD_WRONG")
               {
                $('.inputText').val('');
                 $('.alert-success').fadeIn();
                this.title = "Wrong Password"
               this.message =  "Dear user your old password is wrong"
               } 
              //  else if(this.changepassword.successCode==="OTP_SEND_ON_EMAIL")
              //  {
              //    swal("success OTP send");
              //  }
               else if(this.changepassword.exception==="PASSWORD_SAME_AS_PREVIOUS")
               {
                $('.inputText').val('');
                $('.alert-success').fadeIn();
                  this.title = "Wrong Password"
                 this.message =  "Dear user your New Password is same as Old Password"
               }
               else if(this.changepassword.successCode==="CHANGE_PASSWORD_SUCCESS")
               {
                // this.changepassword = data;
               // $('.alert-success').show();
              //   this.title = "Thank You!"
              //  this.message =  "Dear user your password has been changed Successfully"
                  this.Logout();
                  $('.inputText').val('');
                 swal({
                  title: "Thank You!",
                  text: "Dear user your password has been changed Successfully",
                  icon: "success",
                  // button: false,
                  //closeOnClickOutside: false
                })  
                 localStorage.clear();
                window.location.reload();
                 this.router.navigate(['/home']);
               }
                                 
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



     
      }
  }
