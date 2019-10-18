import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import { ResponseService } from '../response.service';

@Injectable({
  providedIn: 'root'
})
export class CheckloginService {
  // public isAuthenticated(): boolean;
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

checkLoggedInUser() {
    // console.log("in auth")
    // if (!this.isUserDataPresent()) {
    //   console.log("no data to auth")
    //   return false;
    // }

    let uuid = localStorage.getItem("uuid");
    let jwttoken = localStorage.getItem("jwttoken");
    let sessiontoken = localStorage.getItem("sessiontoken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + jwttoken
      })
    };
    let body = {
      'uuid': uuid,
      'sessionToken': sessiontoken,
    };
    // console.log("this is------>",body)
     return this.http.post('https://api.rmehub.in/api/user/getSession', body, httpOptions);
  }
}



// import { Injectable } from '@angular/core';
// import { RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
// import * as CryptoJS from 'crypto-js';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';
// // import { ResponseService } from '../response.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class CheckloginService {
//   uuid:any;
//   sessiontoken:any;
//   jwttoken:any;
//   // public isAuthenticated(): boolean;
//   constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

// checkLoggedInUser() {
//     // console.log("in auth")
//     // if (!this.isUserDataPresent()) {
//     //   console.log("no data to auth")
//     //   return false;
//     // }

//     let uuid = localStorage.getItem("uuid");
//     let jwttoken = localStorage.getItem("jwttoken");
//     let sessiontoken = localStorage.getItem("sessiontoken");
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Token ' + jwttoken
//       })
//     };
//     let body = {
//       'uuid': uuid,
//       'sessionToken': sessiontoken,
//     };
//     if (this.uuid==null || this.sessiontoken==null || this.jwttoken==null)
//     {
//       console.log("not working");
//     }
//     else{
//     // console.log("this is------>",body)
//      return this.http.post('http://acrme.us-east-2.elasticbeanstalk.com/api/user/getSession', body, httpOptions);
  
//   }
// }
// }
