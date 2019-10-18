import {Injectable} from '@angular/core';
import {RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ResetService {
    showNav = true;
    oldpassword: any;// string, any,number,object data type
    newpassword:any;
    confirmPassword:"";
     ipvalue:any;
     serverData:any;
     changepassword:any;
     serverDataLogin:any;
     invalidUser:any;
     isLoginSuccess: boolean;
     publicIP: string;
     res:any;
     uuid:any;
     jwt:any;
    constructor (private http: HttpClient, private router: Router)
    {
        this.uuid= localStorage.getItem("saveid");
        this.jwt = localStorage.getItem("savejwt");
    }
   

    ChangePass()
    {
      console.log("User Valid Login ..........")
         //let headers = new Headers();
        // headers.append('Content-Type', 'application/json; charset=utf-8')
         //headers.append("Authorization","Token " + this.jwt);
         const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Token ' + this.jwt
          })
         };
         let body = {
         'oldpassword': this.oldpassword,
         'newpassword':this.newpassword,
         "uuid" : this.uuid
         
        };
        console.log("this is------>",body)
        console.log("jwt token is", this.jwt);
         var self=this;
         this.http.post('http://ec2-3-19-70-172.us-east-2.compute.amazonaws.com/api/changePassword', body, httpOptions)
         .subscribe(
         (data) => {
             this.changepassword = data;
             console.log("successful verify", data);
            //  localStorage.setItem("username", this.username);
            //  localStorage.setItem("Userdetails", JSON.stringify(data));
                  // localStorage.setItem("username",JSON.parse(localStorage.getItem('Userdetails')).data.fullname)
            this.router.navigate(['/home']);
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