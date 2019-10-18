
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'  

@Injectable({
 providedIn: 'root'
})
export class FirebaseService {
 storageRef:any;
 documentBucket="rmechatfiles";
 config = {
  apiKey: 'AIzaSyCph_hIL1is40Saz3ZKOCWo0x12XJ8oHLM',
  authDomain: 'rmechat-eded9.firebaseapp.com',
  databaseURL: 'https://rmechat-eded9.firebaseio.com',
  projectId: 'rmechat-eded9',
  storageBucket: 'rmechat-eded9.appspot.com',
  messagingSenderId: "701569883732"  
 };
 constructor() {
 
 if (!firebase.apps.length) {
   firebase.initializeApp(this.config);
 }
 this.storageRef = firebase.storage().ref();
 }

 uploadChatDoc(inputFile,fileName, cb){
   this.uploadfile(inputFile,fileName, this.documentBucket,cb)
 }


 uploadfile(inputFile,fileName, bucket, callback){

   let fileExt=inputFile.name.split(".");
   fileExt = fileExt[fileExt.length - 1];
   fileName=fileName+"."+fileExt;

   var uploadTask = this.storageRef.child(bucket+'/'+fileName).put(inputFile);
   uploadTask.on('state_changed',  (snapshot)=>{
   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   console.log('Upload is ' + progress + '% done');
   callback(null,progress,null)
   switch (snapshot.state) {
   case firebase.storage.TaskState.PAUSED: // or 'paused'
     // console.log('Upload is paused');
     break;
   case firebase.storage.TaskState.RUNNING: // or 'running'
     // console.log('Upload is running');
     break;
   }
 }, function(error) {
   console.log("eror during file upload to firebase !!",error);
   return callback(false);
   // Handle unsuccessful uploads
 }, function() {
   // Handle successful uploads on complete
   // For instance, get the download URL: https://firebasestorage.googleapis.com/...
     uploadTask.snapshot.ref.getDownloadURL().then(downloadURL=> {
     console.log('File available at', downloadURL);
      return callback(null,null, {fileName: fileName, link : downloadURL});
   });
 });
 }
 
}