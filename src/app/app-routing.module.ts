import { DashboardComponent } from './dashboard/dashboard.component';
import { CommunityComponent } from './community/community.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard.layout.component';
import { LandownerComponent } from './landowner/landowner.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ProfileComponent,AddSocialComponent,UserinfoComponent } from './profile/profile.component';
import { PostsComponent } from './posts/posts.component';
import { EventsComponent } from './myevents/myevents.component';
import { PostdiscussionComponent } from './postdiscussion/postdiscussion.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { ChangpassComponent } from './changpass/changpass.component';
import { BrokerComponent } from './broker/broker.component';
import { LanddeveloperComponent } from './landdeveloper/landdeveloper.component';
import { BuilderComponent } from './builder/builder.component';
import { BrokinghousesComponent } from './brokinghouses/brokinghouses.component';
import { FacilitatorComponent } from './facilitator/facilitator.component';
import { ProjectinvestorComponent } from './projectinvestor/projectinvestor.component';
import { CustomerComponent } from './customer/customer.component';
import { AddeveventComponent } from './addevevent/addevevent.component';
import { AddannouncComponent } from './addannounc/addannounc.component';
import { CanActivateRouteGuardService } from './services/gaurd/can-activate-route-guard.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { EventsdetailComponent } from './eventsdetail/eventsdetail.component';
import { CertifComponent } from './certif/certif.component';
import { AlleventsComponent } from './allevents/allevents.component';
import { PosteventComponent } from './postevent/postevent.component';
import { ForumsComponent } from './forums/forums.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { TermsofuseComponent } from './termsofuse/termsofuse.component';
import { AdminComponent } from './admin/admin.component';
import { EventconfirmComponent } from './eventconfirm/eventconfirm.component';
const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/home' },

  {
    path: '',
    component: DashboardLayoutComponent,

    children: [
      { path: 'community', component: CommunityComponent},
      { path: 'forums', component: ForumsComponent},
      { path: 'home', component: DashboardComponent },
      { path: 'discussion/:id', component: DiscussionComponent},
      { path: 'certif', component: CertifComponent },
      { path: 'terms-of-use', component: TermsofuseComponent },
     
      {
        path: 'events', 
        children: [
          { path: 'myevents', component: EventsComponent},
          { path: 'allevents', component: AlleventsComponent},
          { path: 'events-detail', component: EventsdetailComponent},
          { path: 'add', component: AddeveventComponent},
          { path: 'post-event', component: PosteventComponent},
          { path: 'announcements/add', component: AddannouncComponent},
          { path: 'admin', component: AdminComponent},
          { path: 'admin/events-detail', component: EventconfirmComponent},          
        ]
      }, 
      {
        path: 'user',
        children: [
          { path: 'land-owner', component: LandownerComponent },
          { path: 'land-developer', component: LanddeveloperComponent },
          { path: 'broker', component: BrokerComponent },
          { path: 'builder', component: BuilderComponent },
          { path: 'facilitator', component: FacilitatorComponent },
          { path: 'broking-house', component: BrokinghousesComponent },
          { path: 'project-investor', component: ProjectinvestorComponent },
          { path: 'customer', component: CustomerComponent },
          { path: 'change-password', component: ChangpassComponent,   canActivate: [CanActivateRouteGuardService] },
         
          {path: 'edit', component: EditprofileComponent},
           {path: 'userprofile/:uuid', component: UserprofileComponent,canActivate: [CanActivateRouteGuardService] },
            ]
      },  

      {
        path: 'user',
        children: [
          {path: 'profile', component: ProfileComponent,
            children:[
          {path: '', redirectTo:"userinfo", pathMatch:'full'},
          {path: 'addsocial', component: AddSocialComponent},
          {path: 'userinfo', component: UserinfoComponent}
         ]
        },
        
        ]
      }, 

      { path: 'posts', component: PostsComponent },
      // { path: 'profile', component: ProfileComponent},
     
      { 
        path: 'postdiscussion', component: PostdiscussionComponent, 
         canActivate: [CanActivateRouteGuardService] 
        },
       
    ]
  },
  {
    path: 'login',
    loadChildren: './login/auth.module#AuthModule'
  },
  {
    path: 'resetpassword',
    loadChildren: './resetpass/res.module#ResModule'
  },
  {
    path: 'resetemail',
    loadChildren: './resetemail/resem.module#ResemModule'
  },
  {path: '**', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}
 
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  static components = [
    DashboardComponent, AdminComponent, EventconfirmComponent, UserprofileComponent,TermsofuseComponent, CommunityComponent, ForumsComponent, PosteventComponent, CertifComponent, AlleventsComponent, AddannouncComponent, EventsdetailComponent, CustomerComponent, FacilitatorComponent, ProjectinvestorComponent, BrokinghousesComponent, BrokerComponent, BuilderComponent, LanddeveloperComponent, ChangpassComponent, ProfileComponent, DiscussionComponent, EventsComponent, PostsComponent, PostdiscussionComponent, LandownerComponent, EditprofileComponent, NotfoundComponent
  ];
}
