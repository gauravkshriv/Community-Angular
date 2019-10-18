import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {IQuestions} from '../../models/models';

@Component({
  selector: 'app-favdisc',
  templateUrl: './favdisc.component.html',
  styleUrls: ['./favdisc.component.css']
})
export class FavdiscComponent implements OnInit {
  AllTimeTrending:IQuestions;

  constructor(private questionService:QuestionService) { }

  ngOnInit() {
    this.getAllTimeTrendingQuestions()
  }

  getAllTimeTrendingQuestions(){
    this.questionService.getAllTimeTrendingQuestionsList()
      .subscribe((data:any)=>{
          this.AllTimeTrending=data.questions;
        },
        error=>{
          if(error.error.msg[0]==undefined){
            swal("Error", "Some Error Occurred");
            return
          } else {
            swal("Error", error.error.msg[0]);
            return
          }
        }
      )
  }

  capitalizeFirstLetter(val){
    return val.charAt(0).toUpperCase() + val.slice(1)
  }


}
