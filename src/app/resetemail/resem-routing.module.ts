import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetemailComponent }  from './resetemail.component';
import { ResetpassComponent } from '../resetpass/resetpass.component';
const authRoutes: Routes = [
	{ 
	  path: '',
	  component: ResetemailComponent
	}
];

@NgModule({
  imports: [ RouterModule.forChild(authRoutes) ],
  exports: [ RouterModule ]
})
export class ResemRoutingModule{ 
    static components = [ 
		ResetpassComponent, ResetemailComponent
	];
}
