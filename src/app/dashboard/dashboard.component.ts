import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {ICategory, IQuestions} from '../models/models';
import {SweetAlert} from 'sweetalert/typings/core';
import * as _swal from 'sweetalert';
import {QuestionService} from '../services/question.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../services/data.service';
import {LoadingService} from '../services/load.service';
const swal: SweetAlert = _swal as any;
import { CookieService } from 'ngx-cookie-service';
import * as $ from 'jquery';
// declare var $ :any;
// window['jQuery'] = window['$'] = $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  category: ICategory[];
  username:string;
  flag:boolean;
setinter:any;
  questionempty:any;
  questionsList: IQuestions[];
  selectedItemIndex: number;
  selectedCategoryName: string;
  lod:any;
  show: any = localStorage.getItem("userLoginStatus");
  constructor(config: NgbModalConfig, private modalService: NgbModal, private cookieService: CookieService, private categoryService: CategoryService, private questionService: QuestionService, private dataServeice: DataService, private Loading:LoadingService) {
    this.category = [];
    this.selectedItemIndex = 0;
    this.username= localStorage.getItem("username");
    config.backdrop = 'static';
    config.keyboard = false;
  }

   ngOnInit() {
  
    
     this.lod= this.Loading._loading=true;
      this.getCategories();

      $(window).on('load',function(){
        // delay in milliseconds
            setTimeout(()=>{
                $('#modallogout').modal('show');
            }, 10000);
        
        });

        // $(window).on('load',function(){
        //   // delay in milliseconds
        //       setTimeout(()=>{
        //           // $('#modalcookies').modal('show');
        //           $("#openmodal").click();
        //       }, 500);
          
        //   });

        
          
}
// open(content) {
//   this.modalService.open(content);
// }

  getCategories() {
    // this.flag=true;
    this.categoryService.getCategories()
      .subscribe((data: any) => {
        console.log("check category",data);
        this.lod= this.Loading._loading=false;
          this.category = data.categories;
          console.log("this.category",this.category);

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
        console.log("questionsList data",data)
          if(data.questions.length===0){
            this.questionsList=[]
            } else{
            this.questionsList = data.questions;
            this.questionempty = data;
            console.log("questionsList",this.questionsList);
            console.log("questionempty",this.questionempty);

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

// window.location.reload();

move_left() {
  console.log(document.getElementById('slider-container').scrollLeft);
  
  document.getElementById('slider-container').scrollLeft -= 200;
}

move_right() {
  console.log( document.getElementById('slider-container').scrollLeft);
  document.getElementById('slider-container').scrollLeft += 200;
}
  
}
