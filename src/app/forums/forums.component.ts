import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {ICategory, IQuestions} from '../models/models';
import {QuestionService} from '../services/question.service';
import {DataService} from '../services/data.service';
import {LoadingService} from '../services/load.service';
const swal: SweetAlert = _swal as any;
import { SweetAlert } from 'sweetalert/typings/core';
import * as _swal from 'sweetalert';
@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {
  category: ICategory[];
  username:string;
  flag:boolean;
  questionsList: IQuestions[];
  selectedItemIndex: number;
  selectedCategoryName: string;
  lod:any;
  show: any = localStorage.getItem("userLoginStatus");
  constructor(private categoryService: CategoryService, private questionService: QuestionService, private dataServeice: DataService, private Loading:LoadingService) {
    this.category = [];
    this.selectedItemIndex = 0;
    this.username= localStorage.getItem("username");
  }
  ngOnInit() {
    this.lod= this.Loading._loading=true;
     this.getCategories();

 }

 
 getCategories() {
   // this.flag=true;
   this.categoryService.getCategories()
     .subscribe((data: any) => {
       console.log("check category",data);
       this.lod= this.Loading._loading=false;
         this.category = data.categories;
        
         if(this.category.length>0){
           this.getQuestion(this.category[0].category);
           this.selectedCategoryName=this.category[0].category;
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
     // this.flag=false;
 }

 getQuestion(categoryName) {
   this.questionService.getQuestions(categoryName,5)
     .subscribe((data: any) => {
         if(data.questions.length===0){
           this.questionsList=undefined
         } else{
           this.questionsList = data.questions;
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


 categoryClick(event, newValue, categoryName) {
   this.selectedItemIndex = newValue;
   this.selectedCategoryName = categoryName;
   this.getQuestion(this.category[newValue].category);

 }

 setQuestion(question: IQuestions) {
   this.dataServeice.changeQuestion(question);
 }


}