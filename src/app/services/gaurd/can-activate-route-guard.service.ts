import { Injectable } from "@angular/core";
import * as _swal from "sweetalert";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = _swal as any;
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { CheckloginService } from "../auth/checklogin.service";
@Injectable({
  providedIn: "root"
})
export class CanActivateRouteGuardService implements CanActivate {
  activdata: any;
   
  constructor(private authService: CheckloginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("in auth");
    if (!this.isUserDataPresent()) {
      console.log("no data to auth");
      swal({
        title:"Authentication Error!!!",
        text: "Kindly Login to view this page",
        icon: "error",
        buttons: {
          cancel: {
            text: "Cancel",
            value: false,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: {
            text: "Login Now",
            value: true,
            visible: true,
            className: "",
            closeModal: true,
          }
          
        },
        // button: false,
        //closeOnClickOutside: false
      }) .then(data => {
        console.log("data Authentication  error ",data)
        if(data)
          window.location.href="http://account.rmehub.in/?referral=community";
          else{
            this.router.navigate(['/home'],{replaceUrl:true});
          }
      });
      return false;
    }

 this.authService.checkLoggedInUser().subscribe(
      (data: any) => {
        console.log("successful verify", data);

        if(data.exception==="USER_NOT_FOUND")
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


 else if(data.exception==="SESSION_NOT_FOUND")
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

  else if(data.exception==="JWT_NOT_VALID")
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
  

  else if(data.exception==="JWT_FORMATE_INVALID")
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
  else if(data.exception==="JWT_EXPIRED")
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

else if(data.exception==="JWT_MISSING")
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


  else if(data.exception==="io.jsonwebtoken.ExpiredJwtException")
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
  else if(data.exception==="SESSION_EXPIRED")
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

  else if(data.exception==="SESSION_DEAD")
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

  else if(data.successCode==="SESSION_ACTIVE")
        {
          return true;
//	 swal("Login Successfully");
        } 


        
         else return false;
      //  swal("");
      }, //For Success Response
      err => {
        console.log("got error", err);
        return false;
      } //For Error Response
    );
    return true;
  }


  isUserDataPresent() {
    if (
      localStorage.getItem("Userdetails") == null &&
      localStorage.getItem("jwttoken") == null &&
      localStorage.getItem("sessiontoken") == null
    ) {
      console.log("NOT present");

      return false;
    } else return true;
  }
}
