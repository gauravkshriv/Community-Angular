import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import {ICategory} from '../models/models';
import {CategoryService} from '../services/category.service';
import {QuestionService} from '../services/question.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const swal: SweetAlert = _swal as any;
import { SweetAlert } from 'sweetalert/typings/core';
import * as _swal from 'sweetalert';
@Component({
  selector: 'app-postdiscussion',
  templateUrl: './postdiscussion.component.html',
  styleUrls: ['./postdiscussion.component.css']
})
export class PostdiscussionComponent implements OnInit {
  selectedFile = null;
  fileToUpload = null;
  images:any = [];
  files:any=[];
  allfiles:any=[];
  jwttoken:any;
  uuid:string;
  result:string="";
  selectedcateg:any;
  category:any=[];
  spinner=false;
  public Editor = ClassicEditor;
  propertyTypes:Array<string> = ["WEBINAR", "SEMINAR"];
  constructor(private router: Router,private activatedRoute: ActivatedRoute,private http: HttpClient, private categoryService: CategoryService, private questionService: QuestionService) {
    this.uuid=localStorage.getItem('uuid');
    this.jwttoken = localStorage.getItem("jwttoken");
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((data: any) => {
          this.category = data.categories;
        },
        error => {
          if (error.error.msg[0] == undefined) {
            swal('Error', 'Some Error Occurred');
            window.location.reload();
            return;
          } else {
            swal('Error', error.error.msg[0]);
            return;
          }
        }
      );
  }

 
  title='';

  postDiscussion() {
    this.spinner=true;
    const httpOptions = {
      headers: new HttpHeaders({
        //  'Content-Type':  'application/json',
         'Authorization': 'Token ' + this.jwttoken}
         )};

    let description = document.getElementsByClassName('ck ck-content ck-editor__editable ck-rounded-corners ck-blurred ck-editor__editable_inline').item(0).innerHTML;
    // console.log("this.selectedcateg",this.selectedcateg);
    if(this.selectedcateg == undefined)
    {
      this.selectedcateg =  'General Real Estate'
      console.log("check",this.selectedcateg);
    }
    console.log("check",this.selectedcateg);
    let body = new FormData();
    body.append('category', this.selectedcateg);
    body.append('title', this.title);
    body.append('description', description);
    body.append('uuid', this.uuid);
    body.append('files', this.allfiles);
 

    if(this.selectedcateg ===undefined)
    {
    swal({
      text: "Please choose selector to submit Discussion",
      icon: "error",
      title:"Title is Empty",
      closeOnClickOutside: false
    })
  }


    else if(this.title.trim() ==="")
    {
    swal({
      text: "Please Enter Title to submit Discussion",
      icon: "error",
      title:"Title is Empty",
      closeOnClickOutside: false
    })
  }
  else if(description.trim() ==='<p><br data-cke-filler="true"></p>'
  )
  {
  swal({
    text: "Please Enter Description to submit Discussion",
    icon: "error",
    title:"Description is Empty",
    closeOnClickOutside: false
  })
}
else{
      
console.log("==========================>", body);
// this.questionService.postDiscussion(body)
this.http.post('https://apicomm.rmehub.in/api/rmehub/forumdiscussion/question', body, httpOptions)
.subscribe((data: any) => {
      if (data.status == true) {
        console.log("====>post discussion status",data);
        this.spinner=false;
        swal('Success', 'Question Added Successfully').then(() => {
          this.router.navigate(['/discussion',data.questionId]);

        });
      } else {
        return;
      }}, //For Success Response
   
      error => {
        if (error.error.msg == undefined) {
          swal('Error', 'Some Error Occurred').then(()=>
          {
            window.location.reload();

            return;
          });
        
        } else {
          swal('Error', error.error.msg[0]).then(()=>
          {
            window.location.reload();

            return;
          });
        }
      }
);
}

  
}

////////////////////////////////////////////////////////


fileuploads(event){
  const files = event.target.files;
  console.log(files);
  if(files)
  {
    for(let i=0; i<files.length; i++){
      const image= {
        name:"",
        type:"",
        size:"",
        url:""
      };
      this.allfiles.push(files[i]);
      image.name=files[i].name;
      image.type=files[i].type;
      image.size=files[i].size;



 // show image preview
      const reader = new FileReader();
      reader.onload=(filedata)=>{
        image.url = reader.result + "";
        this.images.push(image);
      };
      reader.readAsDataURL(files[i]);

///////////////////
    }
  }
  event.srcElement.value = null;
}


deleteImage(image:any){

  const index = this.images.indexOf(image);
  this.images.splice(index,1);
  console.log(" this.images", this.images);
  this.allfiles.splice(index,1);
}


}

