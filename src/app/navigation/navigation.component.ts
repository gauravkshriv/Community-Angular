import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ICategory } from '../models/models';
import { QuestionService } from '../services/question.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Encryptor} from '../services/encryption.service';

// import swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
import { ResponseService } from '../services/response.service';
import { CookieService } from 'ngx-cookie-service';
import {SocketService} from '../services/socket.service';
const swal: SweetAlert = _swal as any;
import { SweetAlert } from 'sweetalert/typings/core';
import * as _swal from 'sweetalert';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  category: ICategory[];
  sockerservice:SocketService;
  loginservedata: any;
  button: boolean;
  serverData:any;
  userLoginProfile: false;
  setinter:any;
  uuid: any;
  profiledata: any;
  jwttoken: any;
  sessiontoken: any;
  close_navi:boolean;
  logout:any;
  fullname:any;
  profileimg:any;
  username:any;
  show: boolean = localStorage.getItem("userLoginStatus")  == "true" ? true : false;
  showprofile: boolean = localStorage.getItem("userLoginProfile") == "true" ? true : false;
  showkyc: boolean = localStorage.getItem("kycstatus") == "true" ? true : false;
  accountrme: any = this.cookieService.get("accountrme");
  //localStorage.getItem
  constructor(private cookieService: CookieService,private http: HttpClient, private router: Router, private dataService: ResponseService, private encryptor: Encryptor, private categoryService: CategoryService, private activatedRoute: ActivatedRoute, private questionService: QuestionService, private socketservice:SocketService) {
    this.uuid = localStorage.getItem("uuid");
    this.jwttoken = localStorage.getItem("jwttoken");
    this.sessiontoken = localStorage.getItem("sessiontoken");
    this.fullname = localStorage.getItem("fullname");
    this.username = localStorage.getItem("username");
    console.log("app component sokcet..........................................................")
  }

  ngOnInit() {
    $('.dropdown-menu').click(function(e) {
      console.log('ksjdksd');
         e.stopPropagation();
      });

    this.router.events.subscribe(() => {
      this.closeNav();
    });
    this.getCategories();
    this.GetUSer();
    this.ValidateLogin();


    $(".routlet_sec").click(function() {
      let wid=$('#mySidenav').width();
      // console.log("--------------",wid);
      if(wid==250){
           console.log("=============>");
          $('#mySidenav').width(0);
       }
       });
     
      //  this.setinter = setInterval(()=>
      //  {
      //    if(!this.cookieService.get('accountrme'))
      //    {
      //      console.log("chek cookies modal")
         
      //    }
      //     //  this.Cookies_Academy();
      //    },20000)
      $('.cookies-data').show();
  }


  Cookies_none()
{
  $('.cookies-data').hide();
  }

  Cookies_Academy()
{
  console.log('closed');
  $('.cookies-data').hide();
  this.cookieService.set('accountrme', 'true');
}

  popup() {
    this.router.navigate(['user/profile']);
    // console.log("get full name-->",localStorage.getItem("fullname"))
    if (this.profiledata.firstname == null) {
      swal({
        title: "Thank You!!!",
        text: "Please complete information Detail on our Portal.",
        icon: "success",
        // button: false,
        closeOnClickOutside: false
      })
        .then(() => {
          this.SendLoadData();
        });
      // console.log("get full name--> if condition")
    }
  }

// ///////////////////////////////////////////////////////////////////////////////////////////////////////



faq(){
  swal({
    title: "Under Development",
    icon: "info",
  })
}


//////////////////////////////////////



  GetUSer() {
if (this.uuid==null || this.sessiontoken==null || this.jwttoken==null)
{
  localStorage.clear();
  console.log("not working");
}
else{
  let body = {
    'uuid': this.uuid,
    "sessionToken": this.sessiontoken
  };
    this.questionService.getuserdata(body)
      .subscribe(
        (data) => {
          this.profiledata = data;
          console.log("=============================>", this.profiledata);
          this.profileimg= this.profiledata.profilepicture;
          if (this.profiledata.firstname == null) {
            localStorage.setItem("userLoginProfile", "true");
            console.log("check red bar issue");
            this.showprofile = true
          }
           else if (this.profiledata._kst == "PENDING")  {
             localStorage.setItem("kycstatus", "true");
             this.showkyc = true;
           }
           else{}
          
        }, //For Success Response
        (err) => {
          console.log("got error", err)
          //  self.serverDataLogin=err;
        } //For Error Response
      );
  }
};





  Logout() {
    let body = {
      'uuid': this.uuid,
      "sessionToken": this.sessiontoken
    };
    console.log("this is------>", body)

    var self = this;
    this.questionService.LogOutPortal(body)
      .subscribe(
        (data) => {
          this.logout = data;
          console.log("=============================>", this.logout);
    if(this.logout.exception==="SESSION_NOT_FOUND")
           {
    swal({
      title: "You session has expired.",
      text: "Please login again !!",
      icon: "info",
      closeOnEsc: false,
      closeOnClickOutside: false,
      
      }).then(() => {
       localStorage.clear(); 
      this.router.navigate(['/home'],{replaceUrl:true});
      window.location.reload();
    })
     } 

    else if(this.logout.exception==="USER_NOT_FOUND")
           {
    swal({
      title: "User is not Found",
      text: "Please login again !!",
      icon: "info",
      closeOnEsc: false,
      closeOnClickOutside: false,
      
      }).then(() => {
       localStorage.clear();
      this.router.navigate(['/home'],{replaceUrl:true});
      window.location.reload();
    })
     } 



   else(this.logout.successCode==="LOGOUT_SUCCESS")
  {
    //localStorage.setItem("userLoginProfile", "false");
  //  this.socketservice.socket.disconnect(); 
    localStorage.clear();
    this.router.navigate(['/home'],{replaceUrl:true});
    window.location.reload();
} 


}, //For Success Response
(err) => {
console.log("got error",err)

          } //For Error Response
);
}


ValidateLogin()
	{
		const httpOptions = {
			headers: new HttpHeaders({
				 'Content-Type':  'application/json',
				 'Authorization': 'Token ' + this.jwttoken})
			  };
		 	let body = {
			 'uuid': this.uuid,
			 'sessionToken':this.sessiontoken,
      };
      if (this.uuid==null || this.sessiontoken==null || this.jwttoken==null)
{
  console.log("not working");
}
else{
			// console.log("this is------>",body)
		 	// var self=this;
		 this.http.post('https://api.rmehub.in/api/user/getSession', body, httpOptions)
		 	.subscribe(
 	    (data) => {
					 console.log("successful verify", data);
					 this.serverData=data;
           if(this.serverData.exception==="USER_NOT_FOUND")
           {
    swal({
      title: "User does not exist on system.",
      text: "Please login again !!",
      icon: "info",
      closeOnEsc: false,
      closeOnClickOutside: false,
      
      }).then(() => {
       localStorage.clear();
      this.router.navigate(['/home'],{replaceUrl:true});
      window.location.reload();
    })
           }
   
   
    else if(this.serverData.exception==="SESSION_NOT_FOUND")
           {
    swal({
      title: "You session has expired.",
      text: "Please login again !!",
      icon: "info",
      closeOnEsc: false,
      closeOnClickOutside: false,
      
      }).then(() => {
       localStorage.clear();
      this.router.navigate(['/home'],{replaceUrl:true});
      window.location.reload();
    })
     } 
   
     else if(this.serverData.exception==="JWT_NOT_VALID")
           {
    swal({
      title: "Session Expired",
      text: "Please login again !!",
      icon: "info",
      closeOnEsc: false,
      closeOnClickOutside: false,
      })
      .then(() => {
       localStorage.clear();
       this.router.navigate(['/home'],{replaceUrl:true});
       window.location.reload();
    })
     }
     
   
     else if(this.serverData.exception==="JWT_FORMATE_INVALID")
     {
   swal({
   title: "Invalid JWT format.",
   text: "Please login again !!",
   icon: "info",
   closeOnEsc: false,
   closeOnClickOutside: false,
   
   }).then(() => {
     localStorage.clear();
    this.router.navigate(['/home'],{replaceUrl:true});
    window.location.reload();
   })
   } 
     else if(this.serverData.exception==="JWT_EXPIRED")
     {
   swal({
   title: "You session has expired.",
   text: "Please login again !!",
   icon: "info",
   closeOnEsc: false,
   closeOnClickOutside: false,
   
   }).then(() => {
     localStorage.clear();
    this.router.navigate(['/home'],{replaceUrl:true});
    window.location.reload();
   })
   } 
   
   else if(this.serverData.exception==="JWT_MISSING")
   {
   swal({
   title: "Authentication Token Missing.",
   text: "Please login again !!",
   icon: "info",
   closeOnEsc: false,
   closeOnClickOutside: false,
   
   }).then(() => {
   localStorage.clear();
   this.router.navigate(['/home'],{replaceUrl:true});
   window.location.reload();
   })
   } 
   
   
     else if(this.serverData.exception==="io.jsonwebtoken.ExpiredJwtException")
     {
    swal({
      title: "Warning",
      text: "Please login again !!",
      icon: "info",
      closeOnEsc: false,
      closeOnClickOutside: false,
      
      }).then(() => {
       localStorage.clear();
      this.router.navigate(['/home'],{replaceUrl:true});
      window.location.reload();
    })
     }
     else if(this.serverData.exception==="SESSION_EXPIRED")
           {
    swal({
      title: "You session has expired.",
      text: "Please login again !!",
      icon: "info",
      closeOnEsc: false,
      closeOnClickOutside: false,
      
      }).then(() => {
      localStorage.clear();
     this.router.navigate(['/home'],{replaceUrl:true});
     window.location.reload();
   })
     }
   
     else if(this.serverData.exception==="SESSION_DEAD")
                  {
           swal({
             title: "Warning",
             text: "Please login again !!",
             icon: "info",
             closeOnEsc: false,
             closeOnClickOutside: false,
             
             }).then(() => {
               localStorage.clear();
              this.router.navigate(['/home'],{replaceUrl:true});
              window.location.reload();
            })
            } 
			//    else if(this.serverData.successCode==="SESSION_ACTIVE")
      //          {
			
			// this.router.navigate(['/dashboard'],{replaceUrl:true});
			// //	 swal("Login Successfully");
      //          } 
				
				}, //For Success Response
			 	    (err) => {
						 console.log("got error",err)
						
		 	    } //For Error Response
         );
        }
	}


  // ////////////////////////////////////////////////
  SendLoadData() {
    var dataencript = [
      { jwttoken: localStorage.getItem("jwttoken") },
      { uuid: localStorage.getItem("uuid") },
      { sessiontoken: localStorage.getItem("sessiontoken") }
    ]
    let enc = this.encryptor;
    var ciphertext = (enc.encrypt(JSON.stringify(dataencript)));
    window.location.href = 'http://account.rmehub.in/personalinformation?referral=community&&redirect=http://community.rmehub.in/home&&_ct=' + btoa(ciphertext);
    // console.log("=======================>ciphertext", ciphertext);
  }

  SendDataKyc() {
    var dataencript = [
      { jwttoken: localStorage.getItem("jwttoken") },
      { uuid: localStorage.getItem("uuid") },
      { sessiontoken: localStorage.getItem("sessiontoken") }
    ]
    let enc = this.encryptor;
    var ciphertext = (enc.encrypt(JSON.stringify(dataencript)));
    window.location.href = 'http://account.rmehub.in/kycdetails?referral=community&&redirect=http://community.rmehub.in/home&&_ct=' + btoa(ciphertext);
    // console.log("=======================>ciphertext", ciphertext);
  }


  getCategories() {
    this.categoryService.getCategories()
      .subscribe((data: any) => {
        this.category = data.categories;
      },
        error => {
          if (error.error.msg[0] == undefined) {
            swal("Error", "Some Error Occurred");
            return
          } else {
            swal("Error", error.error.msg[0]);
            return
          }
        }
      )
  }
//  this.openNav=false;
  openNav() {
    this.close_navi=false;
    document.getElementById('mySidenav').style.width = '250px';

    }
  
  

  closeNav() {
    this.close_navi=true;
    document.getElementById('mySidenav').style.width = '0';

  }

  bodynav() {
    if(!this.close_navi){
      console.log("=================>");
     document.getElementById('mySidenav').style.width = '0';
    }

  }

  postDiscussion(title, category) {

    let description = document.getElementsByClassName('ck ck-content ck-editor__editable ck-rounded-corners ck-blurred ck-editor__editable_inline').item(0).innerHTML;

  }
}
