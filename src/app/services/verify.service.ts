import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  private baseUrl: any;
  private statusService = new BehaviorSubject('false');
  currentStatus = this.statusService.asObservable();
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://ec2-3-19-70-172.us-east-2.compute.amazonaws.com/';
    var status = localStorage.getItem("isLoginSuccessfull") || "false";
    this.changeStatus(status);
  }

  checkUser(username, fnsuccess, fnerror) {
  	console.log("User Login detail on check user clicked..........")
  	let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers: headers});
    let body = {
      'username': username
    };
    this.http.put(this.baseUrl+"verifyUserName", body)
    .subscribe(
        fnsuccess, //For Success Response
        fnerror //For Error Response
    );
  }


  changeStatus(status: string) {
    this.statusService.next(status)
    localStorage.setItem("isLoginSuccessfull",status)
  }
}
