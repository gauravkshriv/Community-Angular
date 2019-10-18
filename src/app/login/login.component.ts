
import { Component, OnInit } from '@angular/core';
import {RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
import * as CryptoJS from 'crypto-js';
import {ResponseService} from '../services/response.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Encryptor} from '../services/encryption.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	showNav = true;
	title = "Login Form";
	 serverData:any;
	 res:any;
	 btndisbled:false;
	 cipherText:any;
	 bytes:any;
	 data:any;
	 profiledata:any;
	 _ct:any;
	 originalText:string;
	 uuid:any;
	 sessiontoken:any;
	 decryptedData:any;
	 jwttoken:any;

	 
	// @Output() onLogin = new EventEmitter<boolean>();
  constructor(private http: HttpClient, private router: Router,private activatedRoute: ActivatedRoute,private encryptor:Encryptor, private dataService: ResponseService) 
  {
	this.PortalData();
	console.log("app component sokcet..........................................................")

  }
  
ngOnInit() {
	
// await 
//  this.ValidateLogin();
 
}


PortalData(){
  this.activatedRoute.queryParams.subscribe( (params: Params) => {
	this._ct = params['_ct'];
	//console.log("------->_ct" , this._ct);

	var byte = this.encryptor.decrypt(atob(unescape(this._ct)));

	this.decryptedData = (JSON.parse(byte.toString(CryptoJS.enc.Utf8)));

	console.log("------------------------------>",this.decryptedData);
	
	localStorage.setItem("Userdetails", this.decryptedData[0].Userdetails);
	 localStorage.setItem("username", this.decryptedData[1].username);
	 localStorage.setItem("userLoginStatus","true");

	 localStorage.setItem('uuid',this.decryptedData[6].uuid);
	 localStorage.setItem('sessiontoken',this.decryptedData[2].sessiontoken);
	 localStorage.setItem('jwttoken',this.decryptedData[3].jwttoken);
	 //  localStorage.setItem("Userdetails", JSON.stringify(Userdetails));
	 localStorage.setItem("fullname", this.decryptedData[5].fullname);
		   swal({
			title: "Thank You!",
			text: "Welcome to RME Community Portal.",
			icon: "success",
			// button: false,
			//closeOnClickOutside: false
		})
	
	this.router.navigate(['/home'],{replaceUrl:true});
	// swal("Login Successfully");

  });
}




//  async	ValidateLogin()
// 	{
// 		this.uuid= localStorage.getItem("uuid");
// 		this.jwttoken = localStorage.getItem("jwttoken");
// 		this.sessiontoken = localStorage.getItem("sessiontoken");

// 		const httpOptions = {
// 			headers: new HttpHeaders({
// 				 'Content-Type':  'application/json',
// 				 'Authorization': 'Token ' + this.jwttoken})
// 			  };
// 		 	let body = {
// 			 'uuid': this.uuid,
// 			 'sessionToken':this.sessiontoken,
// 			};
// 			// console.log("this is------>",body)
// 		 	var self=this;
// 		 await	this.http.post('http://acrme.us-east-2.elasticbeanstalk.com/api/user/getSession', body, httpOptions)
// 		 	.subscribe(
//  	    (data) => {
// 					 console.log("successful verify", data);
// 					 self.serverData=data;
// 			  if(this.serverData.exception==="USER_NOT_FOUND")
//                {
// 				swal({
// 					title: "Warning",
// 					text: "Please login again !!",
// 					icon: "info",
// 					closeOnEsc: false,
// 					closeOnClickOutside: false,
					
// 				  }),
// 				  localStorage.clear();
// 				  window.location.reload();
// 				  this.router.navigate(['/dashboard']);
//                }
//                else if(this.serverData.exception==="SESSION_NOT_FOUND")
//                {
// 				swal({
// 					title: "Warning",
// 					text: "Please login again !!",
// 					icon: "info",
// 					closeOnEsc: false,
// 					closeOnClickOutside: false,
					
// 				  }),
// 				 localStorage.clear();
// 				 window.location.reload();
// 				 this.router.navigate(['/dashboard']);
// 			   } 
// 			   else if(this.serverData.exception==="JWT_NOT_VALID")
//                {
// 				swal({
// 					title: "Warning",
// 					text: "Please login again !!",
// 					icon: "info",
// 					closeOnEsc: false,
// 					closeOnClickOutside: false,
					
// 				  }),
// 				  localStorage.clear();
// 				 window.location.reload();
// 				 this.router.navigate(['/dashboard'],{replaceUrl:true});
// 			   } 
// 			   else if(this.serverData.exception==="io.jsonwebtoken.ExpiredJwtException")
// 			   {
// 				swal({
// 					title: "Warning",
// 					text: "Please login again !!",
// 					icon: "info",
// 					closeOnEsc: false,
// 					closeOnClickOutside: false,
					
// 				  }),
// 				localStorage.clear();
// 				window.location.reload();
// 				this.router.navigate(['/login']);
// 			   }
// 			   else if(this.serverData.exception==="SESSION_EXPIRED")
//                {
// 				swal({
// 					title: "Warning",
// 					text: "Please login again !!",
// 					icon: "info",
// 					closeOnEsc: false,
// 					closeOnClickOutside: false,
					
// 				  }),
// 				  localStorage.clear();
// 				  window.location.reload();
// 				 this.router.navigate(['/dashboard'],{replaceUrl:true});
// 			   } 
// 			   else if(this.serverData.exception==="SESSION_DEAD")
//                {
// 				swal({
// 					title: "Warning",
// 					text: "You have Logout, Please Login again !!",
// 					icon: "info",
// 					closeOnEsc: false,
// 					closeOnClickOutside: false,
					
// 				  }),
// 				  localStorage.clear();
// 				  window.location.reload();
// 				 this.router.navigate(['/dashboard'],{replaceUrl:true});
// 			   } 
// 			   else(this.serverData.successCode==="SESSION_ACTIVE")
//                {
			
// 			this.router.navigate(['/dashboard'],{replaceUrl:true});
// 			//	 swal("Login Successfully");
//                } 
				
// 				}, //For Success Response
// 			 	    (err) => {
// 						 console.log("got error",err)
						
// 		 	    } //For Error Response
// 			 	);
// 	}

	
	
}

