import { Injectable, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import Swal from 'sweetalert2';
// import { SweetAlert } from 'sweetalert/typings/core';
// const swal: SweetAlert = _swal as any;
const socketurl = "https://apichat.rmehub.in/";
// const socketurl = "http://localhost:8083/";
@Injectable({
 providedIn: 'root'
})
export class SocketService {
socket:any;
jwttoken:any;
username:any;
userId:any;
 constructor() {
   console.log("running constructor");
   this.username= localStorage.getItem("username");
   this.userId = localStorage.getItem("uuid");
   this.jwttoken = localStorage.getItem("jwttoken");
   this.socket = io.connect(socketurl);

   // console.log('this.socket.id',this.socket.id);
   this.socket.on('connect', () => {
     if(this.username === null ||  this.userId === null ){
       console.log("user login nahi he");
       // this.socket.disconnect();
     }
     else{
       console.log("user login he setUsername");
       this.socket.emit('setUsername',{userName:this.username,userId:this.userId})
     }
     // console.log('this.socket.id',this.socket.disconnect()); // 'G5p5...'
   });
  //  this.socket.on('reconnect_attempt', (attemptNumber) => {
  //    console.log('reconnect_attempt',attemptNumber);
  //    // this.socket.io.opts.query = {
  //    //   token: 'fgh'
  //    // }
  //  });
  //  this.socket.on('reconnecting', (attemptNumber) => {
  //    console.log('reconnecting',attemptNumber);
  //    if(attemptNumber == 6){
  //      Swal({
  //        title: 'There is No Connect ..',
  //        html: `Please Connect Internet..`,
  //      })   
  //    } else if(attemptNumber < 6) {
  //      Swal({
  //        title: 'Establishing a secure connection',
  //        html: `Please wait While Attemplting to connect ${attemptNumber}/5`,
  //        timer: 10000,
  //        onBeforeOpen: () => {
  //          Swal.showLoading()
  //        }
  //      })
  //    }
  //    else{
  //      console.log('going to disconnect..');
  //      // io.Socket.disconnect()
  //    }
  //  });
   this.socket.on('reconnect_error', (error) => {
     console.log('reconnect_error',error);
   });
   this.socket.on('reconnect_failed', () => {
     console.log('reconnect_failed');
   });
   this.socket.on('error', (error) => {
     console.log('error',error);
   });
   this.socket.on('disconnect', (reason) => {
     if (reason === 'io server disconnect') {
       // the disconnection was initiated by the server, you need to reconnect manually
       console.log('io server disconnect going to connect manualy');

       this.socket.connect();
     }
     // else the socket will automatically try to reconnect
     console.log('socket will automatically try to reconnect');
   });
 }
 OnDestroy(){
   this.socket.disconnect();
 }

}