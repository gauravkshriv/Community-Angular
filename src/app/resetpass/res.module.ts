import { NgModule }   from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetpassComponent }  from './resetpass.component';
import { ResRoutingModule }  from './res-routing.module';
@NgModule({
  imports: [     
        CommonModule,
		ReactiveFormsModule,
        ResRoutingModule,
        FormsModule,ReactiveFormsModule,HttpClientModule
  ], 
  declarations: [
    ResetpassComponent
  ],
  providers: [],
})
export class ResModule { }