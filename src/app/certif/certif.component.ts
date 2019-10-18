import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certif',
  templateUrl: './certif.component.html',
  styleUrls: ['./certif.component.css']
})
export class CertifComponent implements OnInit {
  public searchText : string;
  public customerData : any;
  state:any;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

    this.State();
    var temp = '<p class="check">ok </p>';

    $(".ok").append(temp);

    $(".check").click((e)=>
    {
      console.log("check",e);
    })
  } 

  State() {
    return this.http.get('./assets/state.json').subscribe(
      data => {
         this.customerData = data;	 
         console.log(this.customerData);
       },
       (err) => {
         return err;
        // console.log("got error",err);
         
       }
     );
     
  }

  





}
