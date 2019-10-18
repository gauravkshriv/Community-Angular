import { Component, OnInit } from '@angular/core';
import {RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
@Component({
  selector: 'app-resetemail',
  templateUrl: './resetemail.component.html',
  styleUrls: ['./resetemail.component.css']
})
export class ResetemailComponent implements OnInit {

	title = "Reset Password";
  email: any;// string, any,number,object data type
	 resetemail:any;
	 serverDataLogin:any;
	 invalidUser:any;
	 isLoginSuccess: boolean;
	 res:any;
	
	// @Output() onLogin = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }
  

  ngOnInit() {
  }

	ResetPass()
	{
		   console.log("User Valid Login ..........")
		   let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8'});
		 	let options = new RequestOptions({ headers: headers});
		 	let body = {
			 'email': this.email,
			};
			if(this.email=="")
			{
			  swal("please enter username");
			}
		
			// console.log("this is------>",body)
		 
			else{
			var self=this;
		 	this.http.post('http://ec2-3-19-70-172.us-east-2.compute.amazonaws.com/resetPassword', body)
		 	.subscribe(
 	    (data) => {
					 console.log("successful verify", data);
					 self.resetemail=data;
					 if(this.resetemail.exception=="INVALID_CREDENTIALS")
					 {
						swal("Error", "Invalid Credentials. Username or password is incorrect", "error");
					 }
					 else if(this.resetemail.exception=="FIELD_CAN_NOT_BE_EMPTY")
					 {
						 swal("please Enter Email Address");
					 } 
					 else if(this.resetemail.exception=="EMAIL_NOT_VALID")
					 {
						 swal("please Enter valid Email");
					 } 
					 else if(this.resetemail.exception=="USER_NOT_FOUND")
					 {
						 swal("No user exist for this email");
					 } 
					 else if(this.resetemail.exception=="RESET_PASS_EMAIL_SUCCESS")
					 {
						 swal("Reset Password Email success has been sent");
					 } 
					 else{
					//  localStorage.setItem("username", this.username);
				//	localStorage.setItem("Userdetails", JSON.stringify(data));
				//		self.serverDataLogin=data;	  
			//	console.log("server msg", this.resetemail.msg);
				 this.router.navigate(['/login']);
				 swal("Reset Password Email success has been sent on your mail ID");
			
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