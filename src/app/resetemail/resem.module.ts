import { NgModule }   from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetemailComponent }  from './resetemail.component';
import { ResemRoutingModule }  from './resem-routing.module';
@NgModule({
  imports: [     
        CommonModule,
		ReactiveFormsModule,
        ResemRoutingModule,
        FormsModule,ReactiveFormsModule,HttpClientModule
  ], 
  declarations: [
    ResetemailComponent
  ],
  providers: [],
})
export class ResemModule { }