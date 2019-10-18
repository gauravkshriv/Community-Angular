import { NgModule }   from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent }  from './login.component';
import { AuthRoutingModule }  from './auth-routing.module';
@NgModule({
  imports: [     
        CommonModule,
		ReactiveFormsModule,
        AuthRoutingModule,
        FormsModule,ReactiveFormsModule,HttpClientModule
  ], 
  declarations: [
        LoginComponent
  ],
  providers: [],
})
export class AuthModule { }