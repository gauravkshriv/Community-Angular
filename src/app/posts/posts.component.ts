import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {QuestionService} from '../services/question.service';
import {IQuestions} from '../models/models';
import {LoadingService} from '../services/load.service';
const swal: SweetAlert = _swal as any;
import { SweetAlert } from 'sweetalert/typings/core';
import * as _swal from 'sweetalert';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  questionsList: IQuestions[];
  categoryName: string;
  uuid:any;
  lod:any;

  constructor(private router: Router, private Loading:LoadingService, private ds: DataService, private activatedRoute: ActivatedRoute, private questionService: QuestionService) {
    this.uuid=localStorage.getItem('uuid');
    console.log("this.uuid",this.uuid);
  }


  ngOnInit() {
    this.lod= this.Loading._loading=true;
    this.categoryName = this.activatedRoute.snapshot.queryParams['category'];
    this.getQuestion(this.categoryName);
  }

  getQuestion(categoryName) {
    this.questionService.getQuestions(categoryName, -1)
      .subscribe((data: any) => {
        this.lod= this.Loading._loading=false;
          this.questionsList = data.questions;
          console.log("======================> dataq",this.questionsList);
        },
        error => {
          if (error.error.msg[0] == undefined) {
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
            this.getQuestion(this.categoryName);
          }
        },
        error => {
          if (error.error.msg[0] == undefined) {
            swal('Error', 'Some Error Occurred');
            return;
          } else {
            swal('Error', error.error.msg[0]);
            return;
          }
        }
      );
  }

  likeOrDislikeStatus(question){
    if(question.likeDislike.length===0){
      return undefined;
    }
    let flag=undefined;
    question.likeDislike.forEach(value => {
      if(value.user.uuid===this.uuid && value.likeOrDislike==true){
        flag=true;
        return false;
      }
      if(value.user.uuid===this.uuid && value.likeOrDislike==false){
        flag=false;
        return false;
      }
    });
    return flag;
  }


}
