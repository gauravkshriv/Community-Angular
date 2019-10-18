import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetpassComponent }  from './resetpass.component';
import { ResetemailComponent } from '../resetemail/resetemail.component';
const authRoutes: Routes = [
	{ 
	  path: '',
	  component: ResetpassComponent
	}
];

@NgModule({
  imports: [ RouterModule.forChild(authRoutes) ],
  exports: [ RouterModule ]
})
export class ResRoutingModule{ 
    static components = [ 
		ResetpassComponent, ResetemailComponent
	];
}
