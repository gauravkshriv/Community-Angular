import { Injectable } from '@angular/core';
import{ HttpInterceptor, HttpHandler, HttpRequest, HttpEvent,HttpHeaders, HttpErrorResponse, HttpResponse}
  from '@angular/common/http';
  import { CheckloginService } from "./auth/checklogin.service";
// import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Router} from '@angular/router';
import 'rxjs/add/operator/do';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  sessiontoken:any;
  jwttoken:any;
  headers:any;
 constructor(private authService: CheckloginService, private router: Router,) {
  this.jwttoken = localStorage.getItem("jwttoken");
 }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    // console.log("==========requesr object",req);
    
    return next.handle(req).do(evt => {
      if (evt instanceof HttpResponse) {
        // console.log("evt response",evt);
        // console.log("===============================---->>>",evt.body.successCode);
        // console.log("==============>",evt.body.exception)
        if(evt.body.exception==="SESSION_DEAD"){
          swal({
            					title: "Warning",
            					text: "You have already logout Please login again !!",
            					icon: "info",
            					closeOnEsc: false,
            					closeOnClickOutside: false,
            				  }),
                    localStorage.clear();
                    this.router.navigate(['/home']);
            				window.location.reload();
            			
        }
      }
    });
  
}
// Any interceptor that we want to create needs to implement the HttpInte

}



// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
//   console.log("==============check success code>",req.body.successCode);
 
//   return next.handle(req).do(evt => {
//     if (evt instanceof HttpResponse) {
//       console.log(evt);
//       console.log("===============================---->>>",evt.body.successCode);

//     } 
//   });

  
// }

// // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {