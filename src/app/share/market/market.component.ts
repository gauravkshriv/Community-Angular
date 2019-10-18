import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  filter = false;

  onFilterChange(eve: any) {
    this.filter = !this.filter;
     console.log('filter change called');
  }

  cross()
 {
   $("#tab3").fadeOut();
   $('.filters').removeClass('filterback');
 }
}
