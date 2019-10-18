import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommunityComponent } from './community/community.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { PostsComponent } from './posts/posts.component';
import { DashboardLayoutComponent }  from './layout/dashboard.layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LandownerComponent } from './landowner/landowner.component';
import { DeveloperComponent } from './developer/developer.component';
import { BuilderComponent } from './builder/builder.component';
import { BrokerComponent } from './broker/broker.component';
import { AcademyComponent } from './academy/academy.component';
import { MarketComponent } from './share/market/market.component';
import { LocationComponent } from './share/location/location.component';
import { CertifComponent } from './certif/certif.component';
import { FilterComponent } from './share/filter/filter.component';
import { CertificateComponent } from './share/certificate/certificate.component';
import { FavdiscComponent } from './share/favdisc/favdisc.component';
import { TrendingComponent } from './share/trending/trending.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ProfileComponent, AddSocialComponent,UserinfoComponent } from './profile/profile.component';
import {CategoryService} from './services/category.service';
import {QuestionService} from './services/question.service';
import {DataService} from './services/data.service';
import {DatePipe} from './pipes/customPipes';
import { PostdiscussionComponent } from './postdiscussion/postdiscussion.component';
import { EventsComponent } from './myevents/myevents.component';
import { DiscussionComponent } from './discussion/discussion.component';
import {ResetService} from './services/reset.service';
import {VerifyService} from './services/verify.service';
import { ChangpassComponent } from './changpass/changpass.component';
import { LanddeveloperComponent } from './landdeveloper/landdeveloper.component';
import { BrokinghousesComponent } from './brokinghouses/brokinghouses.component';
import { FacilitatorComponent } from './facilitator/facilitator.component';
import { ProjectinvestorComponent } from './projectinvestor/projectinvestor.component';
import { CustomerComponent } from './customer/customer.component';
import {Encryptor} from './services/encryption.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddeveventComponent } from './addevevent/addevevent.component';
import {UtilService} from './services/util.service';
import {ResponseService} from './services/response.service';
import { AddannouncComponent } from './addannounc/addannounc.component';
import { NgDatepickerModule } from 'ng2-datepicker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CheckloginService } from './services/auth/checklogin.service';
import { FilterPipe} from './services/filter.pipe';
import {CanActivateRouteGuardService} from './services/gaurd/can-activate-route-guard.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/tokeninterceptor';
import { EventsdetailComponent } from './eventsdetail/eventsdetail.component';
import { AlleventsComponent } from './allevents/allevents.component';
import { AgmCoreModule } from '@agm/core';
import { PosteventComponent } from './postevent/postevent.component';
import { ForumsComponent } from './forums/forums.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { TermsofuseComponent } from './termsofuse/termsofuse.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AdminComponent } from './admin/admin.component';
import { EventconfirmComponent } from './eventconfirm/eventconfirm.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { OwlModule } from 'ngx-owl-carousel';
import { CookieService } from 'ngx-cookie-service';
import { FootersComponent } from './footers/footers.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    DashboardComponent,
    CommunityComponent,
    DashboardLayoutComponent,
    NavigationComponent,
    FooterComponent,
    PostsComponent,
    SidenavComponent,
    LandownerComponent,
    DeveloperComponent,
    BuilderComponent,
    BrokerComponent,
    AcademyComponent,
    MarketComponent,
    LocationComponent,
    CertifComponent,
    FilterComponent,
    CertificateComponent,
    FavdiscComponent,
    TrendingComponent,
    EditprofileComponent,
    ProfileComponent,
    DatePipe,
    DiscussionComponent,
    EventsComponent,
    PostdiscussionComponent,
    ChangpassComponent,
    LanddeveloperComponent,
    BrokinghousesComponent,
    FacilitatorComponent,
    ProjectinvestorComponent,
    CustomerComponent,
    AddeveventComponent,
    AddannouncComponent,
    NotfoundComponent,
    EventsdetailComponent,
    AlleventsComponent,
    PosteventComponent,
    UserinfoComponent,
    ForumsComponent,
    UserprofileComponent,
    TermsofuseComponent,
    PrivacypolicyComponent,
    AdminComponent,
    EventconfirmComponent,
    AddSocialComponent,
    FootersComponent,
    
  ],
  imports: [  NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
    apiKey: "AIzaSyCV_bsADQ3wszpK6lR0jzhnwNVRrkyxbYI",
    libraries: ["places"]
  }),  FormsModule, 
   Ng2SearchPipeModule, 
   OwlModule,
    NgDatepickerModule,
    BrowserModule,
     CKEditorModule, 
      NgbModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule,
     CKEditorModule, 
     ServiceWorkerModule.register('/service-worker.js', { enabled: environment.production }), 

  ],
  exports:[
    DatePipe
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }, CategoryService, CheckloginService, CookieService, CanActivateRouteGuardService, UtilService, ResponseService, VerifyService, QuestionService, DataService, ResetService,Encryptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
