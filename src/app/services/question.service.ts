import {Injectable} from '@angular/core';
import {RME_URL_MAPPING} from './RME_URL_MAPPING';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders } from '@angular/common/http';

interface Location
{
  latitude:string;
  longitude:string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  jwttoken:any;
  httpOptions:any;
  constructor(private http: HttpClient) {
    this.jwttoken = localStorage.getItem("jwttoken");
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.jwttoken
      })

    };
  }


  LogOutPortal(body)
  {
    return this.http.post(RME_URL_MAPPING.LOG_OUT,body,this.httpOptions);
  }
  getQuestions(categoryName: string, limit: number) {
    return this.http.get(RME_URL_MAPPING.GET_QUESTION_URL + 'category=' + categoryName + '&limit=' + limit);
  }

  getQuestionById(qid,uuid) {
  
    return this.http.get(RME_URL_MAPPING.GET_QUESTION_BY_ID_URL + qid+"&uuid="+uuid);
  }

  getConfirmRequest(qid,rid,uuid,approval) {

    return this.http.get(RME_URL_MAPPING.GET_CONFIRM_REQUEST + qid+"&requestedInviteeUserId="+rid+"&uuid="+uuid+"&approval="+approval,this.httpOptions);
  }

  postchangeststatus(body) {

    return this.http.post(RME_URL_MAPPING.GET_ADMIN_CHANGE_STATUS,body,this.httpOptions);
  }


  getConfirmRequestByAdmin(qid,uuid,approval) {

    return this.http.get(RME_URL_MAPPING.GET_ADMIN_CONFIRM + uuid+ '&approval='+ approval+'&eventId='+ qid,this.httpOptions);
  }

  postcommentbyuser(body)
  {
  return this.http.post(RME_URL_MAPPING.POST_COMMENT_USER,body,this.httpOptions)
  }

  getEventsByAdminorMentor(uuid)
  {
    return this.http.get(RME_URL_MAPPING.GET_EVENT_ADMIN +uuid,this.httpOptions);
  }

  getEventById(qid,uuid) {
    return this.http.get<Location>(RME_URL_MAPPING.GET_EVENT_BY_ID_URL + qid+"&uuid="+uuid);
  }

  getJointEventById(qid,uuid) {  
    
    return this.http.get(RME_URL_MAPPING.GET_JOIN_EVENT_ID + qid+"&uuid="+uuid,this.httpOptions);
  }


  getMonthlyTrendingQuestionsList() {
    return this.http.get(RME_URL_MAPPING.GET_MONTHLY_TRENDING_URL);
  }

  getAllTimeTrendingQuestionsList() {
    return this.http.get(RME_URL_MAPPING.GET_ALLTIME_TRENDING_URL);
  }

  changeLikeStatus(likeStatus,uuid) {
    return this.http.put(RME_URL_MAPPING.PUT_LIKE_DISLIKE_URL + 'status=' + likeStatus.status + '&questionid=' + likeStatus.qid + "&uuid=" +uuid,{},this.httpOptions);
  //  return this.http.put('http://rmecommunity.us-east-2.elasticbeanstalk.com/api/rmehub/forumdiscussion/like_dislike?status=false&questionid=1&uuid=4ca6887c-7996-44f1-adf8-92f28613d9ca',this.httpOptions)
  }

  postSocial(body)
  {
    return this.http.post(RME_URL_MAPPING.POST_SOCIAL_MEDIA,body,this.httpOptions);
  }

  postDiscussion(body) {
    // console.log(body.toString());
    return this.http.post(RME_URL_MAPPING.POST_DISCUSSION_URL, body,this.httpOptions);

  }

  getuserdata(body) {
    return this.http.post(RME_URL_MAPPING.GET_USER_DATA,body,this.httpOptions);

  }

  postCommentReply(commentReply) {
    return this.http.post(RME_URL_MAPPING.POST_COMMENT_REPLY_URL, commentReply,this.httpOptions);
  }


  getFilter(occupation,location,rating,page,size)
  {
    return this.http.get(RME_URL_MAPPING.GET_FILTER+'occupation='+occupation+','+'location='+location+','+'rating='+rating+'&page='+page+'&size='+size);
  }





}
