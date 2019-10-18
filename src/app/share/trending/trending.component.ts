import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {IQuestions} from '../../models/models';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
  monthlyTrending:IQuestions;

  constructor(private questionService:QuestionService) { }

  ngOnInit() {
    this.getMonthlyTrendingQuestions()
  }
  getMonthlyTrendingQuestions() {
    this.questionService.getMonthlyTrendingQuestionsList()
      .subscribe((data:any)=>{
          this.monthlyTrending=data.questions;
          console.log("===========================>trending", this.monthlyTrending)
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
