import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StateService {
  eventsdetail:boolean=false;

  constructor(private http: HttpClient, private router: Router) { }
  
   GetState(){}

}
