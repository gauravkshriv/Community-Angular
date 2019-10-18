import {Component, OnInit} from '@angular/core';
import {IQuestions} from '../models/models';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {QuestionService} from '../services/question.service';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
declare var $ :any;
const swal: SweetAlert = _swal as any;
import { SweetAlert } from 'sweetalert/typings/core';
import * as _swal from 'sweetalert';
@Component({
  selector: 'app-post',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  question: IQuestions;
  likeOrDislike: boolean;
  uuid:any;
  qid:any;
  private sub: any;
  jwttoken:any;
  username:any;
  
  commentinput:any;
  show: boolean = localStorage.getItem("userLoginStatus")  == "true" ? true : false;
  constructor(private router: Router, private http: HttpClient,private ds: DataService, private route: ActivatedRoute, private questionService: QuestionService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.uuid=localStorage.getItem('uuid');
    this.jwttoken = localStorage.getItem("jwttoken");
    this.username=localStorage.getItem('username');
    // this.question=null;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.qid = params['id'];
    })
     console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM",this.qid)
     if(this.qid === "undefined" || this.qid == null)
     {
       this.router.navigate(['/404'])
console.log("no quid found");}
else{
  this.getQuestion(this.qid);
}
     
   
    $('#replyText').keydown((e)=> {
      console.log(".................")
      if (e.which == 13)
        alert('');
    });

  }

  
  getQuestion(qid) {
    this.questionService.getQuestionById(qid,this.uuid)
      .subscribe((data: any) => {
        console.log('=======================>get question API',data);
          this.question = data;
          // console.log('=======================>get question API',this.question.comments);
          this.likeDislikeStatus();

        },
        error => {
          if (error.error.msg == undefined) {
            swal('Error', 'Some Error Occurred');
            return;
          } else {
            swal('Error', error.error.msg[0]);
            return;
          }
        }
      );
  }

  capitalizeFirstLetter(val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  changeLikeStatus(status, qid) {
    var likeStatus = {
      'status': status,
      'qid': qid
    };
    this.questionService.changeLikeStatus(likeStatus,this.uuid)
      .subscribe((data: any) => {
          if (data.status == true) {
            this.getQuestion(qid);
            console.log("this.getQuestion",this.getQuestion);
          }
        },
        error => {
          if (error.error.msg == undefined) {
            swal('Error', 'Some Error Occurred');
            return;
          } else {
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
              if(data)
                window.location.href="http://account.rmehub.in/?referral=community";
            });
            return;
          }
        }
      );

  }

  swallogin()
  {
    swal({
      title:"Authentication Error!!!",
      text: "Kindly Login to like this blog",
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
      if(data)
        window.location.href="http://account.rmehub.in/?referral=community";
    });

  }

  likeDislikeStatus() {
    if (this.question.likeDislike.length === 0) {
      this.likeOrDislike = undefined;
    }
    this.question.likeDislike.forEach(value => {
      if (value.user.uuid === this.uuid) {
        this.likeOrDislike = value.likeOrDislike;
        return false;
      }
    });
  }

  postComment(e) {
    console.log("ok");
    if(e.which==13 && e.target.value.trim() != "")
 {
    const httpOptions = {
      headers: new HttpHeaders({
        //  'Content-Type':  'application/json',
         'Authorization': 'Token ' + this.jwttoken}
         )};
    let body = new FormData();
    body.append('comment', this.commentinput);
    body.append('questionid', this.qid);
    body.append('uuid', this.uuid);

  console.log("body",body)
  if(this.commentReplyInput=="")
  {

  }
else{
    this.http.post('https://apicomm.rmehub.in/api/rmehub/forumdiscussion/comment', body, httpOptions)
.subscribe(
    (data:any) => {
      console.log("successful verify", data);
      if (data.status == true) {
        // swal('Success', 'Comment Added Successfully').then(()=>{
          $('#inputText').val('');
          this.getQuestion(this.qid);
        // });

      } else {
        return;
      }
      // this.addevent=data;
     
      }, //For Success Response
    (err) => {
    console.log("got error",err)
      } //For Error Response
);
    }
  }
  }



  commentReplyInput:any;

  


  postCommentReply(e,commentId) {
    // if(e.target.va)
 if(e.which==13 && e.target.value.trim() != "")
 {
console.log(e.which);
   var reply=$('#commentReplyInput'+commentId).val()
   const httpOptions = {
      headers: new HttpHeaders({
        //  'Content-Type':  'application/json',
         'Authorization': 'Token ' + this.jwttoken}
         )};
    let body = new FormData();
    body.append('reply',reply);
    body.append('commentid', commentId);
    body.append('uuid', this.uuid);

    
  console.log("body",body)

  this.http.post('http://rmecommunity.us-east-2.elasticbeanstalk.com/api/rmehub/forumdiscussion/commentreply', body, httpOptions)
.subscribe(
  (data:any) => {
    console.log("successful verify", data);
    if (data.status == true) {
      // swal('Success', 'Reply Added Successfully').then(()=>{
        $('#replyText').val('');
       // console.log($("'commentReplyInput+{{comment.id}}"));
        this.ngOnInit();
      // });

    } else {
      return;
    }
    // this.addevent=data;
   
    }, //For Success Response
  (err) => {
  console.log("got error",err)
    } //For Error Response
);
}
  }

  checkImage(fileName){
    let splitFileNames = fileName.split('.');
    let ext = splitFileNames[splitFileNames.length-1];

    if(ext==='jpg' || ext==='png' || ext==='gif' || ext==='jpeg' || ext==='bmp'){
      return true;
    } else {
      return false;
    }
  }

}
