import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Router} from '@angular/router';
import {RequestOptions, Request, RequestMethod, Headers} from '@angular/http';
import {Encryptor} from '../services/encryption.service';
import {ActivatedRoute, Params} from '@angular/router';
import {LoadingService} from '../services/load.service';
import {ResponseService} from '../services/response.service';
import {EnumdataService} from '../services/enumdata.service';
import { SocketService } from '../services/socket.service';
import { QuestionService } from '../services/question.service';
const swal: SweetAlert = _swal as any;
import { SweetAlert } from 'sweetalert/typings/core';
import * as _swal from 'sweetalert';
declare var jquery:any;
declare var $:any;
var profiledata = null;


// var obj = {
//   uuid= localStorage.getItem("uuid");
//     this.sessiontoken = localStorage.getItem("sessiontoken");
//     this.jwttoken = localStorage.getItem("jwttoken");
// };

@Component({
  selector: 'app-addsocial',
  templateUrl: './addsocial.component.html',
  styleUrls: ['./profile.component.css']
})
export class AddSocialComponent implements OnInit {
  uuid:any;
  jwttoken:any;
   portfolio= "";
 facebookLink= "";
 website = "";
 instagramLink= "";
 linkedInLink= "";
 sessiontoken:any;
  onlineStatus=false;
  profiledata=profiledata;
  spinner=false;
  social:any;
  constructor(private http: HttpClient, private socketservice:SocketService, private questionservice:QuestionService,private router: Router,)
  {
    this.uuid= localStorage.getItem("uuid");
    this.jwttoken = localStorage.getItem("jwttoken");
    this.sessiontoken = localStorage.getItem("sessiontoken");

  }

  ngOnInit() { 
    console.log("check addsocial url link",profiledata);

this.socialmed();
    }
    
socialmed()
{
  if(profiledata.socialResponse){

    if(profiledata.socialResponse.facebookLink)    this.facebookLink=profiledata.socialResponse.facebookLink;
    if(profiledata.socialResponse.portfolio)       this.portfolio=profiledata.socialResponse.portfolio;
    if(profiledata.socialResponse.website)         this.website=profiledata.socialResponse.website;
    if(profiledata.socialResponse.instagramLink)   this.instagramLink=profiledata.socialResponse.instagramLink;
    if(profiledata.socialResponse.linkedInLink)    this.linkedInLink=profiledata.socialResponse.linkedInLink;

}

   
    console.log("socketdata");
    this.socketservice.socket.emit('getOnlineUsers',null);
    this.socketservice.socket.on('onlineUsers',(data)=>{
      console.log('socketdata//////',data);
      
    })
  }   
 
    
UpdateSocial()
{
  this.spinner = true;
  console.log("add profile saocial")
  const httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type':  'application/json',
      'Authorization': 'Token ' + this.jwttoken,
    }),
   };

   let body = {
    'uuid': this.uuid,
    "website": this.website,
    "portfolio": this.portfolio,
    "facebookLink": this.facebookLink,
    "instagramLink": this.instagramLink,
    "linkedInLink": this.linkedInLink,
  }; 
  this.questionservice.postSocial(body)
// this.http.post("http://ec2-3-19-70-172.us-east-2.compute.amazonaws.com/api/user/social",body,httpOptions)
.subscribe((data: any)=>{
      console.log("save social url",data);
      this.spinner=false;
      this.social = data;
      this.GetUSer();
      if(this.social.successCode == "SOCIAL_PROFILE_ADDED")
      {
        swal({
          title: "Thank You!",
          text: "SOCIAL PROFILE ADDED SUCCESSFULLY!",
          icon: "success",
          // button: false,
          //closeOnClickOutside: false
        })
      }
   	// this.router.navigate(['/user/profile/userinfo'],{replaceUrl:true});
})
};



GetUSer() {
    let body = {
      'uuid': this.uuid,
      "sessionToken": this.sessiontoken
    };
      this.questionservice.getuserdata(body)
   .subscribe(
   (data) => {
    // this.lod= this.Loading._loading=false;
       this.profiledata = data;
   });
  
}


}

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./profile.component.css']
})
export class UserinfoComponent implements OnInit {
  profiledata=profiledata;
   ngOnInit() 
  { 
    console.log(this.profiledata);
  }  
}



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  imageUrl : string  = "./assets/images/upload.png";
  selectedFile:null;
  serverData:any;
  // occup=[];
  // particip=[];
  // market=[];
  headers:any;
   sessionToken:any;
   serverDataLogin:any;
   lod:any;
   lod1:any;
   invalidUser:any;
   isLoginSuccess: boolean;
   profiledata:any;
   res:any;
   uuid:any;
   occ:any;
   username:any;
   sessiontoken:any;
   _pic:any;
   profileimage:any;
   profilestatus:any = true;
   jwttoken:any;
   deletedata:any;
   deleteDataResponse:any;
   showprofile: any = localStorage.getItem("userLoginProfile");
   Picstatus: any = localStorage.getItem("ProfilePicStatus");

  constructor (private questionservice:QuestionService,private http: HttpClient, private router: Router, private Loading:LoadingService, private activatedRoute: ActivatedRoute, private encryptor:Encryptor, private responsepro : ResponseService, private enumservice:EnumdataService)
  {
    this.username= localStorage.getItem("username");
    this.uuid= localStorage.getItem("uuid");
    this.sessiontoken = localStorage.getItem("sessiontoken");
    this.jwttoken = localStorage.getItem("jwttoken");
    this.GetUSer();
  }


ngOnInit() 
{ 

  this.lod= this.Loading._loading=true;


// this.propop();


}

// propop(){

// }

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


edit()
{
  swal({
    title: "Under Development",
    icon: "info",
  })
}



  ///////////////////////////////////////////////////////////////////////
  handleFileInput(event){
    this.lod1= this.Loading._loading=true;
    this.selectedFile = event.target.files[0];
    console.log("pic================>", this.selectedFile);
    // console.log("User Valid profile ..........")
       const httpOptions = {
        headers: new HttpHeaders({
          //  'Content-Type': 'multipart/form-data',
          'Authorization': 'Token ' + this.jwttoken,
        }),
       };
    // console.log("=====================>",formData)
    let body = new FormData();
    body.append('pic', this.selectedFile)
    body.append('uuid', this.uuid)
       console.log("this is------>",body)
     
       this.http.post('https://api.rmehub.in/api/profilePic/upload',body, httpOptions,)
       .subscribe(
       (data) => {
        this.lod1= this.Loading._loading=false;
           this.profileimage = data;
           console.log("=============================>",this.profileimage);
          
         //  localStorage.setItem("fullname", this.profiledata.fullname);
           if(this.profileimage.exception=="FIELD_CAN_NOT_BE_EMPTY")
           {
            swal("This Field Cannot be empty");
           }
          else if(this.profileimage.exception=="UUID_CANNOT_BE_EMPTY")
          {
            swal("UUID cannot be empty");
               }
               else if(this.profileimage.exception=="PROFILE_PICTURE_FORMAT_INVALID"){
                swal("Accept only .jpg .png");
               }
  
               else if(this.profileimage.exception=="FILE_SIZE_LIMIT_EXCEED"){
                swal("File Size Is Limit Exceed");
               }
               else if(this.profileimage.exception=="JWT_NOT_VALID"){
                swal("JWT Not Valid");
               }
               else if(this.profileimage.exception=="SESSION_EXPIRED"){
                swal("Your Session has Expired"); 
               }
               else if(this.profileimage.exception=="PROFILE_PICTURE_UPLOAD_FAILED"){
                swal("Profile Picture Upload Failed");
               }
               
               else if (this.profileimage.successCode=="PROFILE_PIC_UPLOAD_SUCCESS"){
                this.GetUSer();
                swal({
                  title: "Thank You!",
                  text: "PROFILE PICTURE UPLOADED SUCCESSFULLY!",
                  icon: "success",
                  // button: false,
                  //closeOnClickOutside: false
                })
                // .then(()=>{
               
                //   });
                // window.location.reload();
                // this.router.navigate(['/user/profile'])
              // $("#prof_chang_img").attr("src",this.profileimage.profilepicture);
               }
               else{
                 
               }
              
      }, //For Success Response
             (err) => {
             console.log("got error",err)
            //  self.serverDataLogin=err;
           } //For Error Response
         );
    // show image preview
    var reader = new FileReader();
    reader.onload = (event:any) =>{
    this.imageUrl = event.target.result;
    
    }
      reader.readAsDataURL(this.selectedFile);
    }

  /////////////////////////////////////////////////////////////////////


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
        this.questionservice.getuserdata(body)
     .subscribe(
     (data) => {
      this.lod= this.Loading._loading=false;
         this.profiledata = data;
         profiledata = data;
         console.log("=============================>",this.profiledata)
         localStorage.setItem("fullname", this.profiledata.fullname);
    
        
       


        var tempArray=[];
        this.profiledata._occ.forEach(v => {
          tempArray.push(this.enumservice.kytname.get(v))
          console.log("v",v);
        });

        
        this.profiledata._occ = tempArray;
        tempArray=[];
        this.profiledata._ptype.forEach(v => {
          tempArray.push(this.enumservice.kytname.get(v))
        });
        this.profiledata._ptype = tempArray;


        tempArray=[];
        this.profiledata.market.forEach(v => {
          tempArray.push(this.enumservice.kytname.get(v))
        });
        this.profiledata.market = tempArray;


        // console.log('tempArray',occup);
        //  this.occ = this.profiledata._occ.split(",");
        //  console.log("=====occupatoin",this.occ);

         if (this.profiledata.profilepicture !=  null) {
          localStorage.setItem("ProfilePicStatus", "true");
          this.Picstatus = true;}
          else
          {
            localStorage.setItem("ProfilePicStatus", "false");
            this.Picstatus = false;
          }

          if (this.profiledata.firstname === null) {
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

          // else if(this.profiledata.profilepicture ==  null){
          //   localStorage.setItem("ProfilePicStatus", "false");
          //   this.Picstatus = false;}
         
        
  else
  {
         
      } }, //For Success Response
           (err) => {
           console.log("got error",err)
          //  self.serverDataLogin=err;
         } //For Error Response
       );
}

  }

}

