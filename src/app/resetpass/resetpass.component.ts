import { Component, OnInit } from '@angular/core';
import {RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Router} from '@angular/router';
import { NgIf } from '@angular/common';
import {ActivatedRoute, Params} from '@angular/router';
import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {
    
  
	title = "Reset Password";
  resetPassword: any;// string, any,number,object data type
  Resetrespond:any;
   serverDataLogin:any;
   confirmPassword:"";
	 invalidUser:any;
	 isLoginSuccess: boolean;
   res:any;
   token:any;
	// @Output() onLogin = new EventEmitter<boolean>();

  
  constructor(private http: HttpClient, private router: Router,private activatedRoute: ActivatedRoute) {
  }
  

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.token = params['token'];
      console.log("------->" , this.token);
  });
}

confirmpassword(){
  if (this.resetPassword != this.confirmpassword){
    swal("password do not match")
  }
        }

ResetPasswordConfirm()
	{
		   console.log("User Valid Login ..........")
		   let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8'});
		 	let options = new RequestOptions({ headers: headers});
		 	let body = {
       'resetPassword': this.resetPassword,
       'token': this.token
      };
      if(this.resetPassword=="")
			{
			  swal("please enter New Password");
			}
		else{
      console.log("Token is------>",this.token),
      console.log("Token is------>",body)
		 	var self=this;
		 	this.http.put('https://api.rmehub.in/resetPasswordConfirm', body)
		 	.subscribe(
 	    (data) => {
         console.log("successful verify", data);
           self.Resetrespond=data;
           
           if(this.Resetrespond.exception==="FIELD_CAN_NOT_BE_EMPTY")
           {
            swal("Please Enter New Password");
           }
          else if(this.Resetrespond.exception==="RESET_PASSWORD_TOKEN_MISSING")
           {
            swal("Reset password missing");
           }
           else if(this.Resetrespond.exception==="RESET_PASSWORD_TOKEN_EXPIRED")
           {
            swal("Reset token expired");
           } 
           else if(this.Resetrespond.successCode==="RESET_PASSWORD_SUCCESS")
           {
            swal("Reset Successfully changed");
           }
           else{
					//  localStorage.setItem("username", this.username);
				//	localStorage.setItem("Userdetails", JSON.stringify(data));
		    //		self.serverDataLogin=data;	  
				 this.router.navigate(['/login']);
			
				}}, //For Success Response
			 	    (err) => {
						 console.log("got error",err)
						//  self.serverDataLogin=err;
						// self.setLogin(false);
						// this.router.navigate(['/register']);
		 	    } //For Error Response
			 	);
	}
  }
	
	
}