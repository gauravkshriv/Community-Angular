import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
 cross()
 {
   $("#tab1").fadeOut();
   $('.filters').removeClass('filterback');
 }
 
}
