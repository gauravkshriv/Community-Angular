import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  // private loginstatus: BehaviorSubject<boolean>;

  private loginstatus = new BehaviorSubject<boolean>(false);
  private profilestatus = new BehaviorSubject<boolean>(false);


  currentlogin = this.loginstatus.asObservable();
  currentprofile = this.profilestatus.asObservable();

  constructor() { }

  changeLoginStatus(data:boolean){
    this.loginstatus.next(data);
  }

  changeProfileStatus(data:boolean){
    this.profilestatus.next(data);
  }

 
  }
 

