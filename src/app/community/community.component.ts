import { Component, OnInit, Renderer2, ViewChild, Directive, ElementRef,HostListener } from '@angular/core';
import * as io from 'socket.io-client'; 
import 'bootstrap';
import { Router} from '@angular/router';
// import * from 'ekkolightbox';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
window['jQuery'] = window['$'] = $;
import { HttpClient, HttpHeaders} from '@angular/common/http';
import * as _swal from 'sweetalert';
const swal: SweetAlert = _swal as any;
import {SweetAlert} from 'sweetalert/typings/core';

import { SocketService } from '../services/socket.service';
import { FirebaseService } from '../services/firebase.service';
import  * as downloadjs from 'downloadjs';
import 'rxjs/Rx';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { EmailValidator } from '@angular/forms';
import {saveAs} from 'file-saver';
// import { ArrayType } from '@angular/compiler';
// import firestore from 'firebase/firestore';
const settings = {timestampsInSnapshots: true};
// const config = {
//   apiKey: 'AIzaSyCph_hIL1is40Saz3ZKOCWo0x12XJ8oHLM',
//   authDomain: 'rmechat-eded9.firebaseapp.com',
//   databaseURL: 'https://rmechat-eded9.firebaseio.com',
//   projectId: 'rmechat-eded9',
//   storageBucket: 'rmechat-eded9.appspot.com',
//   messagingSenderId: "701569883732"
// };

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  optionsModel: number[];

//socket = io("https://pacific-mesa-89562.herokuapp.com");
socket:SocketIOClient.Socket;
new_User:any;
allUsers=[];  
user_List=[];
groupList=[];
groupMember=[];
messageArr=[];
profiledata:any;
isNewGroup:boolean=false;
groupname:any
feedback:any;
output:any;
handler:any;
id:any;
newUser:any;
person:any;
RoomId:any;
typing:any;
timeout:any;
DefaultRoomId:any;
message:any;
errorcontainer:any;
GroupChat:boolean=true;
partner:any;
partnerId:any;
feeduser:any;
leftusersec:any;
onlineUsers:any;
userId:any;
head:any;
incomingchat:any;
typing_msg:any
username:any;
private_chat:any;
userNameid:any;
server:any;
timtim:any;
uuid:any;
allChats:any=[];
ShownDataLimit:any=1000;
jwttoken:any;
storageRef:any;
searchname:any;
userlist:any;
imageurl:any;
dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  recentchatwith=[];
// user_name=this.username;
public searchText : string;
public customerData : any;
state:any;

  constructor(
    private renderer:Renderer2,
    private router: Router,
    private http: HttpClient,
    config: NgbModalConfig, 
    private modalService: NgbModal,
    private socketservice:SocketService, 
    private firebaseservice:FirebaseService,
    // private _downloadjs:downloadjs
    ) {
    this.uuid = localStorage.getItem("uuid");
    this.userId = this.uuid;
    this.jwttoken = localStorage.getItem("jwttoken"); //  https://rmechat.herokuapp.com/
   this.socket =  socketservice.socket;
    //  this.socket = io.connect("https://rmechat.herokuapp.com/");
    console.log("this.chatuser.socket.connected",this.socket.connected);
    console.log("this.chatuser.socket.connected",this.socket.disconnected);

    this.username= localStorage.getItem("username");
    this.userNameid='Common Group';
    jQuery.noConflict();  
   }
   @ViewChild('d1') d1:ElementRef;
   onFilterChange(event){
console.log("userListing");
if(event.length>=3){
  
  var id=1;
  this.dropdownList=[{ id:'1', username: '' }]
  this.userListing(event,true);
  // $(".search_comm_user").addClass("dropdownuser");
}
   }
/*
   $('#output').append('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/>
   <img id="openimage" class="chatimg imageouput my_msg_text" src='+item.fileUrl+' target="_blank"><span class="lightbox" id="example1"><img src='+item.fileUrl+' alt="image"></span></p>');

*/
   appendmyimage(item)
   {
     var username = this.uIdToUName(item.senderId)

    const br = this.renderer.createElement('br');
    const strong = this.renderer.createElement('strong');
    this.renderer.addClass(strong,'login_you')
    const strongtext = this.renderer.createText('you:');
    this.renderer.appendChild(strong, strongtext);

    const image = this.renderer.createElement('img');
    this.renderer.addClass(image,'chatimg')
    this.renderer.addClass(image,'imageouput')
    this.renderer.addClass(image,'my_msg_text')

    this.renderer.setProperty(image,'src',item.fileUrl);
    this.renderer.setProperty(image,'alt','image');
    this.renderer.listen(image,'click',(e)=>{
      this.openModal(item.fileUrl)
            })

    const p = this.renderer.createElement('p');
    this.renderer.addClass(p,'animated');
    this.renderer.addClass(p,'fadeIn');
    this.renderer.addClass(p,'imageshow');

     
     this.renderer.appendChild(p, strong);  
     this.renderer.appendChild(p, br);

     this.renderer.appendChild(p, image);

     
     this.renderer.appendChild(this.d1.nativeElement, p);
   }

                     // $('#output').append('<p class="other_msg"><strong class="user_oth">' +this.uIdToUName(item.senderId) + ': </strong><img class="chatimg imageouput" src='+item.fileUrl+' alt="image"></p>');

   appendotherimage(item)
   {
     var username = this.uIdToUName(item.senderId)


    const strong = this.renderer.createElement('strong');
    this.renderer.addClass(strong,'user_oth')
    const strongtext = this.renderer.createText(username);
    this.renderer.appendChild(strong, strongtext);

    const image = this.renderer.createElement('img');
    this.renderer.addClass(image,'chatimg')
    this.renderer.addClass(image,'imageouput')
    this.renderer.setProperty(image,'src',item.fileUrl);
    this.renderer.setProperty(image,'alt','image');
    this.renderer.listen(image,'click',(e)=>{
      this.openModal(item.fileUrl)
            })

    const p = this.renderer.createElement('p');
    this.renderer.addClass(p,'other_msg');

     
     this.renderer.appendChild(p, strong);
     this.renderer.appendChild(p, image);

     
     this.renderer.appendChild(this.d1.nativeElement, p);
   }

   imgdownload(item)
   {
        item.fileUrl
   }

   openModal(url)
   {
     $('#openmodal').click()
     console.log('uuuuuuuuuuuurrrrrrrrrrrrrlllllllllllllllll', url );
      this.imageurl = 'assets/images/profile.jpg';
     this.imageurl =  url;
   }
   openmodal(content){
     this.modalService.open(content)
   }

   binaryData = [];
   
   download(data)
   {
     saveAs(data);
  // let blob = new Blob([data], {"type": "image/jpg"});

  // if(navigator.msSaveBlob){
  //     let filename = 'picture';
  //     navigator.msSaveBlob(blob, filename);
  // } else {
  //     let link = document.createElement("a");
  //     link.href = URL.createObjectURL(blob);
  //     link.setAttribute('visibility','hidden');
  //     link.download = 'picture';
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  // }


    //  downloadjs(url);
    // this.binaryData.push(url)
   
    // // document.body.appendChild(downloadLink);
    // var downloadLink = document.createElement('a');
    // console.log('this.binaryData',this.binaryData);

    // downloadLink.setAttribute('visibility','hidden');
    // downloadLink.href = URL.createObjectURL(new Blob(this.binaryData, {"type": "image/jpeg"}))
    // // downloadLink = url;
    // // downloadLink.innerHTML = url;
    // document.getElementById("#download").appendChild(url);
    // downloadLink.click();


    //  this.binaryData.push(url)
    //  var downloadLink = document.createElement('a');
    //  console.log('this.binaryData',this.binaryData);
    //  downloadLink.setAttribute('visibility','hidden');
     
    //  downloadLink.href =URL.createObjectURL(new Blob(this.binaryData, {"type": "image/jpeg"}))
    //  document.body.appendChild(downloadLink);
    //  downloadLink.click();
    }


    

  ngOnInit() {

    $("#modalImage").modal({
      show: false,
      backdrop: 'static'
  });

  $("#modalPush").modal({
    show: false,
    backdrop: 'static'
});
    // var temp = '<p id="openimage">ok </p>';

    // $(".ok").append(temp);

    $("#openimage").click(()=>{
      alert("The paragraph was clicked.");
    });
    $('.pic img').click(function() {
      var srcToCopy = $(this).attr('src');
      $('body').find('.imgsrc').attr('src', srcToCopy);
      $('body').addClass('no-scroll');
    });
    
    $('#customlightbox-controls').on('click', function() {
      $('body').removeClass('no-scroll');
    });
    
  //   $(".fancybox").fancybox({
  //     helpers:  {
  //         title:  null
  //     }
  // });

    // items: string[] = [{ name: "archie" }, { name: "jake" }, { name: "richard" }];
   
    // this. userListing(this.username,true)
    // this.State();

    
    //  for chat lane ke liye
    this.socket.emit('getMyChats',this.userId);


    $("#transa_noua").click(function(){
      $("#ad_transa").show();
  });

  $('#app').click(()=>{
    console.log('div clicked .............');
    
  })


    this.dropdownList = [
      { id:'1', username: '' },
     
    ];
   
    //  Math.floor(Math.random() * 99999) + 1
    this.dropdownSettings = {
      singleSelection: false,
      idField:"id",
      textField: 'username',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


  
   


    $('.progress').fadeOut(0);
    
    // firebase intialize
    // firebase.initializeApp(config);
    // firebase.firestore().settings(settings);

    // this.storageRef = firebase.storage().ref();
    let lg = console.log;
    // this.socket.emit('setUsername', {userName:this.username,userId:this.userId})
    lg(this.username+" is going to set");
    this.socket.on('userSet', (data : any)=> {
      console.log("userset",data);
      if(data.error)
      {
        console.log(data.error);
        window.location.reload;
      }

      console.log("username", this.username);
     this.allUsers=data.users;
    $('#send').prop('disabled', false)
    this.onlineUser();
   // app.AddToGroupChat(newUserName)
    // $('#output').append('<p class="feeduser'+ data.userData.userName + '"><strong>' + data.userData.userName + 
    // ' is added : </strong><span>'+this.getCurrentDate()+'</span></p>');
    });

    

    $('.bkcg').fadeOut();


  this.socket.on('customError',(data)=>{
 console.log('customError',data);
  })
 

  this.socket.on('userExists',(data)=>{
    // alert(data);
    swal({
			title: "Failed to Connect",
			text: "Please click ok to connect again",
			icon: "info",
			// button: false,
			//closeOnClickOutside: false
    }).then(()=>
    {
      this.router.navigate(['/home']);
      window.location.reload();
    })
    console.log('userExists',data);
     })
    



/////   afterset inclued my group listing

this.socket.on('afterSet',(data)=>{
  lg("afterSet==========================>>>>>>>>>>",data)

  this.allUsers=data.users;
  this.groupList=data.groupList;
  // console.log("groupList[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]",this.groupList);
  this.userId=data.userId;
  this.DefaultRoomId= this.RoomId=data.roomId;
  this.socket.emit('getChatByRoomId',this.RoomId);
  lg('this.RoomId',this.RoomId);
  this.onlineUser();
})


 //  if user already exist check

// this.socket.on('userExists', (data)=> {
//   $('#send').prop('disabled', true)
//   $('#error-container').html(data);
// });


// my group chat details
this.socket.on('getChatByRoomId',(chats)=>{
  console.log("chatsssssssssssssssssssssssss",chats);
  this.updateGroupChatForm(chats)
});



// online user show code
    
    this.socket.emit('getOnlineUsers',null);
    this.socket.on('onlineUsers',(userList)=>{
    this.profiledata = userList.onlineUsers;
    console.log("asduserlody",userList);

    var onlineUsers = userList.onlineUsers;
    if(onlineUsers.length){
      let me = onlineUsers.find(u=>u.userId === this.userId)
      if(me)
      {
        var recentid = me.user.recentChatWith;
        this.updateRecentChat(recentid)
      }
    }

    });



    ////// 

    this.socket.on('recentChatWith',(data)=>{
      console.log('recent list',data);
      this.updateRecentChat(data)
   
   });

    /////   
// incoming message code
    this.socket.on('chat',(data)=>{
       console.log("data repeat",data);
      this.fillOneRow(data);
     
      console.log("scroll down check message");
      this.scrollDown();
  });


  /** Typing emitter  */
  this.socket.on('typing', function(data) {
    console.log("data",data);
      if (data.typing) {
        document.getElementById("typingmsg").innerHTML='<p><em>' + data.name + ' is typing ...</em></p>';
      } else {
        document.getElementById("typingmsg").innerHTML='';
      }
  });


/*
// Typing code other person
  this.socket.on('typing', function (data) {
    this.typing_msg ="<p>" + data + " is typing a message...</p>";
    document.getElementById("typingmsg").innerHTML=this.typing_msg;
    console.log(this.typing_msg," is typng message")
    // feedback.html('<p><em>' + data + ' is typing a message...</em></p>');
  });

  */
  // key timer
  document.getElementById('inputmsg').addEventListener("keyup",()=>{
    this.typing = true;
    this.socket.emit('typing', {name:this.username,room:this.RoomId,typing:this.typing});
    clearTimeout(this.timeout);
    // let unane=this.username;
    // let rid=this.RoomId;
    // console.log("this.username",this.username);
    // console.log("this.username",this.RoomId);
    this.timeout = setTimeout(this.timeoutFunction, 2000);

})


$('#inputmsg').keydown((e)=> {
  if (e.which == 13)
      this.chatEmit();
});

/*
// 




  this.socket.on('nottyping', function (data) {
    document.getElementById("typingmsg").innerHTML="";

  });


  // Typing me
document.getElementById('inputmsg').addEventListener("keydown",()=>{
  document.getElementById("typingmsg").innerHTML="";
  this.socket.emit("typing",this.username);
});
*/
  // add new user show
  this.socket.on('userSet', function(data) {
    // online user show code
    console.log("whats your problem man", data);
    // this.socket.emit('getOnlineUsers',null);
    // this.socket.on('onlineUsers',(userList)=>{
    // this.profiledata = userList;
    // });
    this.incomingchat +="<p><strong>" + data.userData.userName + " added</strong></p>";
 });


// when user left
    this.socket.on('disconnected', (leftUser)=> {
      if(leftUser==this.username)
      {
              window.location.reload();
      }
      this.onlineUser();
      // this.incomingchat +="<p><strong>" + leftUser + " left</strong></p>";          
  });



  $('.bkcg').click(()=>{
    console.log("me back ho gya hu");
    $('.bkcg').fadeOut(0);
    this.RoomId=this.DefaultRoomId,
    console.log("this.RoomId",this.RoomId);
    this.socket.emit('getChatByRoomId',this.RoomId);
    this.onlineUser();
    this.userNameid='Common Group';
    this.GroupChat=true;
   this.partner='';
    this.socket.emit('changeMysocket',{oldRoomId:this.RoomId,newRoomId:this.DefaultRoomId});
    //messageTo="commonGroup";
})

this.socket.on('notifypartnr',(data)=>{
  //// for group 
      if(data.groupid){
        if(this.RoomId != data.groupid){
            $('#bg_'+data.groupid).text('✉');
        }
    } else{
      // for personal
        var _user=this.uIdToUName(data.userid);
        if(_user != this.partner)
            $('#bg_'+_user).text("✉");
    }
})


/// new message

// this.socket.on('newmessage',(data)=>{
//    console.log("sdfsdfd")
//   if(data.handle==this.newUser)
//       $('#output').append('<p class="animated fadeIn my_msg"><strong>You : </strong>' + data.message + '</p>');
//   else
//       $('#output').append('<p class="other_msg"><strong>' + data.handle + ': </strong>' + data.message + '</p>');

// $('#chat-window').animate({
//   scrollTop: $('#chat-window').get(0).scrollHeight
// }, 1000)
// })



this.socket.on('connectPairChat',(data)=>{
 
  this.RoomId=data.roomDetails.roomId;
  console.log("data.roomDetails",data.roomDetails);



  $('#userNameid').html(data.roomDetails.roomName)
  if(data.roomDetails.roomOwnersId.length>0 && this.isNewGroup){
    console.log("this.isNewGroup",this.isNewGroup,'data.roomDetails',data.roomDetails);
    
      let className="_"+data.roomDetails.roomName;
      var ptag = `<li class="list-group-item rounded-0" id=`+data.roomDetails.roomId
      +`><a class="myClass"><span>`+data.roomDetails.roomName+`</span><span class="badge badge-primary bage"></span></a><span class="dot"></span></li>`;
      console.log(ptag);
      $('#groupnamelist').append(ptag);
      this.isNewGroup = false;
  }
  this.managePeronalChat(data.chats);
})


this.socket.on('newGroupCreated',(newRoom)=>{
  console.log("newRoom",newRoom);
  let className="_"+newRoom.roomName;
  var ptag = '<a href="#" class="myClass '+className+'" onclick="groupChat(\'' + newRoom.roomId + '\')">'+ newRoom.roomName +'<span class="badge badge-primary bage'+newRoom.roomId+'">@</span></a>';
  $('#onlineUsers').append(ptag);
})



this.timtim=$('#uploadedImages');




/////////////// create group

$('#crtgbtn').click(()=>{
  var groupinp=this.groupname
  if(groupinp !== ""){
      this.groupMember.push({usename:this.username,id:this.userId});
      this.socket.emit('createGroup',{memberArr:this.groupMember,ownerId:this.userId,groupName:groupinp});
      this.allChats=[];
     this.isNewGroup=true;
     

      swal({
        title: "Thank You!",
        text: "Your Group has been created.",
        icon: "success",
        buttons: {
          confirm: {
            text: "Close",
            value: true,
            visible: true,
            className: "",
            closeModal: true,
          }
          
        },
        // button: false,
        //closeOnClickOutside: false
      }) .then(data => {
      
        jQuery('#modalPush').modal('hide');
        this.userNameid=groupinp;

        // this.clearSearchFilter();
      
       
      });


  }
})

// jQuery("#img_01").ezPlus()

// openimage(url)
// {
//   //  this.imageurl =  url;
//    console.log("url",url);
// };

// let btn = document.getElementById("openimage");

//  btn.addEventListener("click",(e)=>
//  {
//   console.log("The paragraph was clicked.",e);
//  })





// $("#chat-window").scrollTop($("#chat-window")[0].scrollHeight);

// Assign scroll function to chatBox DIV
$('#chat-window').scroll(()=>{
    if ($('#chat-window').scrollTop() == 0){
        // Display AJAX loader animation
       $('#loader').show();
       console.log("this.allChats",this.allChats);
       
       if(this.allChats.length!=0){
        if(this.allChats.length<this.ShownDataLimit)
        {
          this.allChats = this.allChats.sort((a, b) => a > b ? 1 : -1);
          this.allChats.forEach(item => {
            // info.date= info.date.substring(0, info.date.length - 4);
            this.fillOneRowPre(item);
            
          });
          this.allChats=[];
        }
        else{
          var chatting = this.allChats.splice(-this.ShownDataLimit,this.ShownDataLimit);
          chatting = chatting.sort((a, b) => a > b ? 1 : -1);
          console.log("mmmmmmmmmmmmmmmmmmmm",chatting,this.allChats);
          chatting.forEach(item => {
            // info.date= info.date.substring(0, info.date.length - 4);
            this.fillOneRowPre(item);
        });
        }
       
      }
      else{
        console.log("array is empty",this.allChats)
      }
        
           // Hide loader on success
           $('#loader').hide();
          // Reset scroll
          $('#chatBox').scrollTop(13);
      //  })  
      //  this.showRemainingData();
            
        // },780); 
    }else{
      // console.log('not at top');
      
    }
});

// this.showRemainingData();

this.socket.on('deletedGroup',(room)=>{
  console.log('roomdeleted',room);
  $('#modalinfo').modal('hide');
  $('#'+room.roomId).fadeOut();
  this.groupChat(this.DefaultRoomId);
  $('.bkcg').fadeOut();
  this.onlineUser();
  this.groupList.splice(this.groupList.indexOf(room.roomId),1);
  // if(!groupList.length){
  //     $('#GroupList').html('');
  // }
})

// ngoninit end
  };

updateRecentChat(recentid)
{
  var array = [];
        // var recentid = me.user.recentChatWith;
        recentid.forEach(item => {
          array.push(this.allUsers.find(x=>x.userId == item))
        });
console.log("array",array);
        this.recentchatwith = array
}

  sendfile(){
    this.allfiles.forEach(inputFiles => {
      console.log("checkkkkkkkkkkk all file");
      this.firebaseservice.uploadChatDoc(inputFiles,inputFiles.name,(err,progress,uploadinfo)=>{
        $('.progress').fadeIn(500);
        jQuery('#modalImage').modal('hide');
        if(err)
        {
          console.log("firebase error",err);
          
        }
        if(progress){
          $( ".progress-bar" ).css( "width", progress + "%" ).attr( "aria-valuenow", progress );    
          let fileTitle=inputFiles.name.length > 40? inputFiles.name.substr(0, 40) + '...': inputFiles.name;
        $('#_span').html("Uploading the "+fileTitle+".... "+ progress+" %");
        }
        if(uploadinfo){
          $('#_span').html('');
          $('.progress').fadeOut(0);
          let message=$('#message').val()
          let fileData={RoomId:this.RoomId,userId:this.userId,fileType:inputFiles.type,fileName:inputFiles.name,fileUrl:uploadinfo.link}
          this.socket.emit('fileUpload',fileData,(responce)=>{});
      }
    });
   
    this.timtim.val('')
    // this.sendfile.fadeOut(0);
  })

}
 
  //  uploadfile(inputFiles,callback){
  //   var fileName=inputFiles.name;
  //   var uploadTask = this.storageRef.child('rmechatfiles/'+fileName).put(inputFiles);
  //     $('.progress').fadeIn(500);
  
  // // Register three observers:
  // // 1. 'state_changed' observer, called any time the state changes
  // // 2. Error observer, called on failure
  // // 3. Completion observer, called on successful completion
  //   uploadTask.on('state_changed', function(snapshot){
  //   // Observe state change events such as progress, pause, and resume
  //   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //     this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       this.progress=parseInt(this.progress);
  //       $( ".progress-bar" ).css( "width", this.progress + "%" ).attr( "aria-valuenow", this.progress );    
  //       let fileTitle=fileName.length > 40? fileName.substr(0, 40) + '...': fileName;
  //     $('#_span').html("Uploading the "+fileTitle+".... "+ this.progress+" %");
  //     console.log('Upload is ' + this.progress + '% done');
  //     switch (snapshot.state) {
  //     case firebase.storage.TaskState.PAUSED: // or 'paused'
  //       console.log('Upload is paused');
  //       break;
  //     case firebase.storage.TaskState.RUNNING: // or 'running'
  //       console.log('Upload is running');
  //       break;
  //   }
  // }, function(error) {
  //     console.log("eror during file upload to firebase !!",error);
  //     callback(false);
  //   // Handle unsuccessful uploads
  // }, function() {
  //     $('#_span').html('');
  //     $('.progress').fadeOut(0);
      
  //   // Handle successful uploads on complete
  //   // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  //     callback(downloadURL);
  //     console.log('File available at', downloadURL);
  //   });
  // });
  // jQuery('#modalImage').modal('hide');
  // }





  /**   Get current date function */
  getCurrentDate(){
      let currentDate= new Date().toString();
      return currentDate=currentDate.substring(0,currentDate.length-31);
    }
    
  /**     get user name by user id function  */
  uIdToUName(uid){
    //  lg("lsjfgjsgsjgskjgs",uid,user)
    let row=this.allUsers.find(x=>x.userId==uid);
    if(row)
        return row.userName;
    else return "Unknown User";
  }

  groupName(groupid)
  {
    let row = this.groupList.find(x=>x.roomId==groupid);
    if(row)
    return row.roomName;
    else return 'unknown group';
  }

  
timeoutFunction() {
 $('#hiddenbtn').click();
}
clickMe(){
  this.typing = false;
  this.socket.emit("typing", {name:this.username,room:this.RoomId,typing:this.typing});
}

images:any = [];
files:any=[];
allfiles:any=[];

fileuploads(event){
  this.allfiles=[];
  this.images=[]

  this.files = event.target.files;

  console.log("this.files.length",this.files);

  if(this.files && this.files.length<6)
  {
      $('#modalImage').modal('show');
      for(let i=0; i<this.files.length; i++){
      const image= {
        name:"",
        type:"",
        size:"",
        url:""
      };
      this.allfiles.push(this.files[i]);
      image.name=this.files[i].name;
      image.type=this.files[i].type;
      image.size=this.files[i].size;
     console.log("type",image.type);
     


 // show image preview
      const reader = new FileReader();
      reader.onload=(filedata)=>{
        image.url = reader.result + "";
        this.images.push(image);
      };
      reader.readAsDataURL(this.files[i]);

///////////////////
    }
    console.log("checkkkkkkkkkkkkkkkkkkkkk",this.allfiles);
  }
  else{
    swal({
			title: "Info!",
			text: "Please choose maximum 5 File",
			icon: "info",
			// button: false,
			//closeOnClickOutside: false
		})
  }
  event.srcElement.value = null;
}

deleteImage(image:any){

  const index = this.images.indexOf(image);
  this.images.splice(index,1);
  this.allfiles.splice(index,1);
  // if(!this.allfiles.length)
  // {
  //   $('#modalImage').modal('hide');
  // }
  this.allfiles.length==0? ($('#modalImage').modal('hide')):"";
}
//////////////



  onlineUser(){
    this.socket.emit('getOnlineUsers',null);
    console.log("userList}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}");
    this.socket.on('onlineUsers',(userList)=>{
      this.user_List=userList.onlineUsers;
      // console.log("userList}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}",userList);
      //   if (userList.length > 1) {
      //       userList.forEach(user => {
      //         if(user.userName!=this.handler){
      //             let className="_"+user.userName;

      //             var ptag = '<li class="list-group-item rounded-0">'+
      //             '<a class="myClass '+className+'" (click)="this.privateChat(\'' + user.userName + '\',\'' + user.userId + '\')">'+
      //              user.userName +'<span class="badge badge-primary bage'+user.userName+'"></span></a><span class="dot"></span></li>';
      //             $('.mem').append(ptag);
      //         } else{
      //             var ptag = "<p> You </p>";
      //             $('.mem').append(ptag);
      //         }
      //     });
      //   } else {
      //       $('#onlineUsers').html('')
      //       var ptag="<p>No one is Online</p>";
      //       $('#onlineUsers').append(ptag);
      //   } 
        // if(this.groupList.length>0){
        //   console.log("this.groupList length",this.groupList); 
        //     $('#onlineUsers').append('<br> Groups')
        //     this.groupList.forEach(room => {
        //         let className="_"+room.roomName;
        //         var ptag = '<a href="#" class="myClass '+className+'" onclick="groupChat(\'' + room.roomId + '\')">'+ room.roomName +'<span class="badge badge-primary bage'+room.roomId+'"></span></a>';
        //         $('#onlineUsers').append(ptag);
        //     });
        // }
    })                  ///    problem stmt ==>> handle chat fron and back side
     
    }


    
    fillOneRow(item){
      if(item.type==="message"){
          if(item.senderId==this.userId)
              $('#output').append('<p class="animated fadeIn"><strong class="login_you">You : </strong><br/><br/>' + '<span class="my_msg_text">'+ item.message + "</span></p>");
         else
              $('#output').append('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>' + '<span class="other_msg_text">'+ item.message + "</span></p>");
 
            } 
      // else if(item.type==="left"){
      //     $('#output').append('<p class="feeduser' + item.leftUser + '"><strong>' + item.leftUser + ' left</strong>:<span> '+item.createdAt+'</span></p>');
      // } 
      else if(item.type==="file"){

          if(item.fileType==="image/png" || item.fileType==="image/jpeg"){

              if(item.senderId==this.userId)
              // $('#output').append('<img id="openimage" src='+item.fileUrl+'  data-toggle="modal" data-target="#myModal" alt="image">');
                  // $('#output').append('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><img id="openimage" class="chatimg imageouput my_msg_text" src='+item.fileUrl+' target="_blank"><span class="lightbox" id="example1"><img src='+item.fileUrl+' alt="image"></span></p>');
             this.appendmyimage(item)
                  else
                  this.appendotherimage(item)
                  // $('#output').append('<p class="other_msg"><strong class="user_oth">' +this.uIdToUName(item.senderId) + ': </strong><img class="chatimg imageouput" src='+item.fileUrl+' alt="image"></p>');
          }



          if(item.fileType==="application/msword"){
            if(item.senderId==this.userId)
            $('#output').append('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/word-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
        else
            $('#output').append('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/word-icon.png"/><a href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
    
          }

          
          if(item.fileType==="text/plain"){
            if(item.senderId==this.userId)
            $('#output').append('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/word-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
        else
            $('#output').append('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/word-icon.png"/><a href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
    
          }


          
          if(item.fileType==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
            if(item.senderId==this.userId)
            $('#output').append('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/word-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
        else
            $('#output').append('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/word-icon.png"/><a href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
    
          }

        
          if(item.fileType==="application/vnd.openxmlformats-officedocument.presentationml.presentation"){
            if(item.senderId==this.userId)
            $('#output').append('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/ppt-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
        else
            $('#output').append('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/ppt-icon.png"/><a  href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
    
            }


            if(item.fileType==="application/vnd.oasis.opendocument.spreadsheet"){
              if(item.senderId==this.userId)
              $('#output').append('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/excel-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
          else
              $('#output').append('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/excel-icon.png"/><a  href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
      
              }

              if(item.fileType==="application/vnd.ms-excel"){
                if(item.senderId==this.userId)
                $('#output').append('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/excel-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
            else
                $('#output').append('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/excel-icon.png"/><a  href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
        
                }
          

          if(item.fileType==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
            if(item.senderId==this.userId)
            $('#output').append('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/excel-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
        else
            $('#output').append('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/excel-icon.png"/><a  href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
    
            }
            
          if(item.fileType==="application/x-zip-compressed"){
            if(item.senderId==this.userId)
            $('#output').append('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/zip.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
        else
            $('#output').append('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img src="/assets/images/zip.png"/><a href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
    
          }
         
          
          if(item.fileType==="application/pdf"){
            if(item.senderId==this.userId)
            $('#output').append('<p class="animated fadeIn"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/pdf-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'" target="_blank"><i class="fa fa-download"></i></a></p>');
        else
            $('#output').append('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/pdf-icon.png"/><a  href="'+item.fileUrl+'" target="_blank"><i class="fa fa-download"></i></a></p>');
    
          }
      } 
      // else{
      //     $('#output').append('<p class="feeduser'+ item.addedUser + '"><strong>' + item.addedUser + ' is added</strong>: <span>'+item.createdAt+'</span></p>');
      // }
      // this.scrollDown();
    }

    fillOneRowPre(item){
   
      console.log("personal upload item",item);
      if(item.type==="message"){
          if(item.senderId==this.userId)
              $('#output').prepend('<p class="animated fadeIn"><strong class="login_you">You : </strong><br/><br/>' + '<span class="my_msg_text">'+ item.message + "</span></p>");
         else
              $('#output').prepend('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>' + '<span class="other_msg_text">'+ item.message + "</span></p>");
            
            } 
      // else if(item.type==="left"){
      //     $('#output').append('<p class="feeduser' + item.leftUser + '"><strong>' + item.leftUser + ' left</strong>:<span> '+item.createdAt+'</span></p>');
      // } 
      else if(item.type==="file"){
          if(item.fileType==="image/png" || item.fileType==="image/jpeg"){
              if(item.senderId==this.userId)
                  $('#output').prepend('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><img class="chatimg imageouput my_msg_text" src='+item.fileUrl+' alt="image"></p>');
              else
                  $('#output').prepend('<p class="other_msg"><strong class="user_oth">' +this.uIdToUName(item.senderId) + ': </strong><img class="chatimg imageouput" src='+item.fileUrl+' alt="image"></p>');
          }


          if(item.fileType==="application/msword"){
            if(item.senderId==this.userId)
            $('#output').prepend('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/word-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
        else
            $('#output').prepend('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/word-icon.png"/><a href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
    
          }

          
          if(item.fileType==="text/plain"){
            if(item.senderId==this.userId)
            $('#output').prepend('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/word-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
        else
            $('#output').prepend('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/word-icon.png"/><a href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
    
          }


          if(item.fileType==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
            if(item.senderId==this.userId)
            $('#output').prepend('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/word-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
        else
            $('#output').prepend('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/word-icon.png"/><a href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
    
          }





          if(item.fileType==="application/vnd.openxmlformats-officedocument.presentationml.presentation"){
            if(item.senderId==this.userId)
            $('#output').prepend('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/ppt-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
        else
            $('#output').prepend('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/ppt-icon.png"/><a  href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
    
          }

          if(item.fileType==="application/vnd.ms-excel"){
            if(item.senderId==this.userId)
            $('#output').prepend('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/excel-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
        else
            $('#output').prepend('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/excel-icon.png"/><a  href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
    
            }

            
            if(item.fileType==="application/vnd.oasis.opendocument.spreadsheet"){
              if(item.senderId==this.userId)
              $('#output').prepend('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/excel-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
          else
              $('#output').prepend('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/excel-icon.png"/><a  href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
      
              }


          if(item.fileType==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
            if(item.senderId==this.userId)
            $('#output').prepend('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/excel-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
        else
            $('#output').prepend('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/excel-icon.png"/><a  href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
    
            }


            
          if(item.fileType==="application/x-zip-compressed"){
            if(item.senderId==this.userId)
            $('#output').prepend('<p class="animated fadeIn imageshow"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/zip.png"/><a class="login_you download_inn" href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
        else
            $('#output').prepend('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img src="/assets/images/zip.png"/><a href="'+item.fileUrl+'"><i class="fa fa-download"></i></a></p>');
    
          }
         
          
          if(item.fileType==="application/pdf"){
            if(item.senderId==this.userId)
            $('#output').prepend('<p class="animated fadeIn"><strong class="login_you">You : </strong><br/><span class="login_you">'+item.fileName+'</span><br><img class="imageouput my_msg_text" src="/assets/images/pdf-icon.png"/><a class="login_you download_inn" href="'+item.fileUrl+'" target="_blank"><i class="fa fa-download"></i></a></p>');
        else
            $('#output').prepend('<p class="other_msg"><strong>' +this.uIdToUName(item.senderId) + ': </strong><br>'+item.fileName+'<br><img  src="/assets/images/pdf-icon.png"/><a  href="'+item.fileUrl+'" target="_blank"><i class="fa fa-download"></i></a></p>');
    
          }




      } 
      // else{
      //     $('#output').append('<p class="feeduser'+ item.addedUser + '"><strong>' + item.addedUser + ' is added</strong>: <span>'+item.createdAt+'</span></p>');
      // }
     // this.scrollDown();
    }


// ////




updateGroupChatForm(chats){
  this.allChats=chats;

   console.log ("some data........",chats)
    
  $('#output').html('');
  if(this.allChats.length<this.ShownDataLimit)
  {
    this.allChats.forEach(item => {
      // info.date= info.date.substring(0, info.date.length - 4);
      this.fillOneRow(item);
  });
 
  this.allChats=[];
  }
  else{
    var chatting = this.allChats.splice(-this.ShownDataLimit,this.ShownDataLimit);
  //  this.allChats.splice(-5,5);
    console.log("mmmmmmmmmaaaaaaaaaaaa",chatting,this.allChats);
    chatting.forEach(item => {
      // info.date= info.date.substring(0, info.date.length - 4);
      this.fillOneRow(item);
  });
  }

  this.scrollDown();
}




scrollDown(){
  $('#chat-window').animate({
      scrollTop: $('#chat-window').get(0).scrollHeight
  }, 1000)

}


privateChat(uuname,uid){
  this.partnerId = uid;
  console.log('partnerid',this.partnerId);
  
  this.customerData=[];
  $('#searchuser').val('');
  // $('.search_comm_user').table('');
  console.log("uuname>>>>>>>>>>>>>>>>>>>>>>>",uuname,uid,this.partnerId)
  $('#bg_'+uuname).text("");
  this.updatePrivateChat(uuname,uid)
  this.userNameid=uuname;
  this.partner=uuname;
  this.GroupChat=false;
  this.private_chat=true;
  $('.bkcg').fadeIn(1000);
}


groupChat(groupId){
  if(this.DefaultRoomId==groupId)
  {
    this.userNameid='Common Group';
  }
  else{
    this.userNameid=this.groupName(groupId)+' :'+ this.username;
  }
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",groupId)
 
 $('.bage'+groupId).text('');
 this.updateGroupChat(groupId)
 this.GroupChat=true;
 this.private_chat=false;
 $('.bkcg').fadeIn(1000);
}

updateGroupChat(groupId){
 this.socket.emit('connectGroup',groupId);
}

 updatePrivateChat(uuname,uid){

  console.log('uuname,uid',this.username,uuname,uid)
 this.socket.emit('connectPair',{userId:this.userId,partner:uuname,partnerId:uid});
}

isvalidmessage()
{
 
  // let message = this.message.split(" ");
  // messagearray.forEach(msg => {
  
  // });
  console.log("true")
  // return true;
}
chatEmit() {
  // console.log("this.GroupChat",this.GroupChat);
  // var phone  = /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/
  // var pattern =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // var encodemsg = $('<div />').text(this.message).html();
  var error = this.message.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
 var phone = this.message.match("\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+", "g")
 if(error)
 {
  swal({
        		title: "Error !",
        		text: "Dear User you cannot share Email Address",
        		icon: "info",
        		// button: false,
        		//closeOnClickOutside: false
        	})
   return false;
 }
 if(phone) {
  swal({
    title: "Error !",
    text: "Dear User you cannot share Phone Number",
    icon: "info",
    // button: false,
    //closeOnClickOutside: false
  })
  return false;
}
// if(encodemsg) {
//   swal({
//     title: "Error !",
//     text: "Dear User you cannot script code",
//     icon: "info",
//     // button: false,
//     //closeOnClickOutside: false
//   })
//   return false;
// }
  else
  {
    if(typeof this.message  !=="undefined" && this.message)
    {
      if(this.GroupChat){
          console.log("go for group chat....");
          this.socket.emit('chat', {
          type:"message",
          roomId:this.RoomId,
          senderId:this.userId,
          message:this.message
        });
      } else{
          console.log("go for privateMessage chat....",this.partner);
          // console.log
          this.socket.emit('privateMessage', {
          type:"message",
          roomId:this.RoomId,
          senderId:this.userId,
          partnerId:this.partnerId,
          message:this.message
      })
    }
} }
  $('#inputmsg').val('');
  this.message="";
  $('#inputmsg').focus()

};


// let gbtnclicked=false;

gaddbtn(){
  swal({
    title:"Create Group!",
    // text: "Kindly Login to view this page",
    icon: "info",
    content: {
      element: "input",
      attributes: {
        placeholder: "Enter Group Name",
        type: "text",
      }
    },
    buttons: {
      cancel: {
        text: "Cancel",
        value: false,
        visible: true,
        className: "",
        closeModal: true,
      },
      confirm: {
        text: "Create",
        value: true,
        visible: true,
        className: "",
        closeModal: true,
      }
      
    },
    // button: false,
    //closeOnClickOutside: false
  }) .then(data => {
    if(data){
    this.groupname  = data;
    // this.updateOnlineMemebers();
    // this.makeSelection();
     jQuery('#modalPush').modal('show');
    
    }
  });

}

// //////

// privateChatuser(data,id)
// {
//   console.log('data',data,id);
// }


// design

////////////////
managePeronalChat(chatList) {
  console.log("chatList",chatList)
  jQuery('#output').html('')
  if(chatList.length==0){    
    console.log("chatList",chatList)
    //chatList.length==1
      //lg("chatList[0].firstmessage",chatList[0].firstmessage)
      $('#output').append('<p>Initiate your first chat..</p>');
  } else{
    chatList.forEach(chat => {
      console.log("manage perdsonal chat",chat);
      this.fillOneRow(chat)
    });
    // console.log("chatList else",chatList);
    
    //   for(var a=0; a <chatList.length; a++){
        
    //       if(chatList[a].senderId==this.userId)
    //           $('#output').append('<p class="animated fadeIn"><strong class="login_you">You : </strong><br><br>' + '<span class="my_msg_text">'+ chatList[a].message + "</span></p>");
    //       else
    //           $('#output').append('<p class="other_msg"><strong>' + this.uIdToUName(chatList[a].senderId) + ': </strong><br>' + '<span class="other_msg_text">'+ chatList[a].message + "</span></p>");
    //   }
      this.scrollDown();
  }
}

////////

// updateOnlineMemebers(){
//   $('.searchable1').html('')
//   console.log("user_List", this.user_List);
//   this.user_List.forEach((Element)=>{
   
//       if(Element!=this.newUser)
//           $('.searchable1').append('<option value='+Element+' selected>'+Element+'</option>');
//   })
// }

// uIdToUName(uid){
//   //  lg("lsjfgjsgsjgskjgs",uid,user)
//   let row=this.user.find(x=>x.userId==uid);
//   if(row)
//       return row.userName;
//   else return "Unknown User";
// }


groupinfocheck:any;
groupdeleteid:any;

groupinfo(groupId){
  this.groupdeleteid = groupId;
  // $('#deleteGroup').prop('disabled',true);
  let ul= $('.groupmemberid');
  let room=this.getGroupInfoByRoomId(groupId)
  if(room){
     $('#groupn').html(room.roomName);
     $('#aboutGroup').html('Created by <b>'+this.uIdToUName(room.createdByUserId)+'</b> on '+room.createdAt);
     ul.html('');
     room.roomMembersId.forEach(id => {
       console.log("id",id);
         let uName=this.uIdToUName(id);
         if(room.roomOwnersId.includes(id)){
             if(id==this.userId){
                 if(room.createdByUserId==this.userId){
                    //  groupIdWillD=room.roomId;
                     $('#deleteGroup').prop('disabled',false);
                 }
                 // ul.append(`<li class="list-group-item  animated fadeInTop ">You <a href="#" class="badge badge-primary bm animated flash">Admin</a></li>`);
                 ul.append(`<li class="list-group-item  animated fadeInTop ">You <a href="#" class="badge badge-primary bm animated flash">Admin</a></li>`);
             } else{
             let drop=this.getDropDown(uName,id,room,true);
                 // ul.append(`<li class="list-group-item  animated fadeInTop">`+uName+`<a data-dismiss="modal" onclick="privateChat(\`` + uName + `\`)"class="badge badge-primary animated flash bm">Admin</a></li>`);
                 ul.append(`<li class="list-group-item  animated fadeInTop ">`+drop+`<span class="badge badge-primary bm animated flash">Admin</span></li>`);
             } //
         }else{
             // let drop=getDropDown(uName,id,room);
             if(id==this.userId){
                 // ul.append(`<li class="list-group-item animated fadeInTop">You </li>`);
                 ul.append(`<li class="list-group-item animated fadeInTop">You </li>`);
             } else{
             let drop=this.getDropDown(uName,id,room,false);
                 // ul.append(`<li class="list-group-item  animated fadeInTop"><a data-dismiss="modal" onclick="privateChat(\`` + uName + `\`)">`+uName+`</a></li>`);
                 ul.append(`<li class="list-group-item  animated fadeInTop">`+drop+`</li>`);
             }
         }
     });
  } else{
     console.log("can't find Group Info");
  }
  }


  getGroupInfoByRoomId(roomId){
    var row=this.groupList.find(x=>x.roomId==roomId);
    if(row)
        return row;
    else return false;
 }


//  delete group 
 GroupDelete()
 {
  this.socket.emit('deleteGroup',{roomId:this.groupdeleteid,userId:this.userId});
  console.log("'deleteGroup',{roomId:this.groupdeleteid,deletedBy:this.userId}",{roomId:this.groupdeleteid,deletedBy:this.userId})
 }



 getDropDown(uName,id,room, isThisAd){
  let isIAd=room.roomOwnersId.includes(this.userId);
  let adminAction;
  if(isIAd){
      if(isThisAd)
          adminAction='Dismiss from Admin';
      else
          adminAction='Make as Admin';
      return '<div class="dropdown mdrop">'+uName+' '
              +'<a class="dropdown-toggle" data-toggle="dropdown"></a>'
              +'<div class="dropdown-menu dropdown-primary">'
                  +'<a data-dismiss="modal" (click)="privateChat(\'' + uName + '\',\'' + id + '\')" class="dropdown-item">Message to '+uName+'</a>'
                  +'<a data-dismiss="modal" (click)="toggleAdmin(\'' + room.roomId + '\',\'' + id + '\')" class="dropdown-item">'+adminAction+'</a>'
                  +'<a data-dismiss="modal" (click)="removeFromGroup(\'' + room.roomId + '\',\'' + id + '\')" class="dropdown-item">Remove from Group</a>'
              +'</div></div>';
  } else{
      if(isThisAd){
      adminAction='Request to become Admin';
      return '<div class="dropdown mdrop">'+uName+''
              +'<a class="dropdown-toggle" data-toggle="dropdown"></a>'
              +'<div class="dropdown-menu dropdown-primary">'
                  +'<a data-dismiss="modal"  (click)="privateChat(\'' + uName + '\',\'' + id + '\')" class="dropdown-item">Message to '+uName+'</a>'
                  +'<a data-dismiss="modal"  (click)="rqsttobeAdmin(\'' + uName + '\',\'' + id + '\',\'' + room.roomName + '\')" class="dropdown-item">'+adminAction+'</a>'
              +'</div></div>';
      } else{
          return '<div class="dropdown mdrop">'+uName+' '
              +'<a class="dropdown-toggle" data-toggle="dropdown"></a>'
              +'<div class="dropdown-menu dropdown-primary">'
                  +'<a data-dismiss="modal"  onclick="privateChat(\'' + uName + '\',\'' + id + '\')" class="dropdown-item">Message to '+uName+'</a>'
              +'</div></div>';
      }
  }

}

// groupinfo(groupId)
// {
//   $('.groupmemberid').html('');
 
//     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",groupId)
//     this.groupinfocheck = this.groupList.find(x=>x.roomId == groupId)
//     $('.groupadmin').html(this.uIdToUName(this.groupinfocheck.roomOwnersId[0]));
//     this.groupinfocheck.roomMembersId.forEach(element => {
//       console.log('element',this.uIdToUName(element));
//       $('.groupmemberid').append('<li>'+this.uIdToUName(element)+'</li>');
//       $('.groupn').html(this.groupinfocheck.roomName);
//       $(".groupmemberid li").addClass("delete");

      
//     });
//     // var groupusername = this.uIdToUName(groupinfocheck.)
    
//   //   this.groupinfocheck  = this.groupList.find(function(element)
//   //   {
//   //     return element.roomMembersId;
//   //   })
//    console.log('groupinfocheck',this.groupinfocheck);
// }


///   window update if new chat sthen show
// use1(event)
// {
 

//   if(event.length>2)
//   {
//     console.log("use1 event");
//     this.userListing(event,true);
//     // this.searchText='';
//   }
  
// }  





userListing(username,gstatus) {
  if(username.length<=1){
    setTimeout(() => {
      this.customerData=[];
    }, 1000);

return;
  }
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + this.jwttoken
    })
  };

  if(username.length<3)
  return;

  // this.itemList = [];
this.http.get('https://apicomm.rmehub.in/api/userlist?userName='+username+'&uuid='+this.uuid, httpOptions)
    .subscribe(
      (responce) => {
        // this.userlist = data;//"USER_NOT_FOUND"
         this.userlist=responce;
         if(!gstatus){
          this.customerData = this.userlist.extraData.User;
         }
        else
        {
        console.log("===================",username,"==========scrb>", responce);
        this.dropdownList=[];
        if(this.userlist.exception == "USER_NOT_FOUND" || this.userlist.extraData.User.length==0){
          console.log("=============================scrb>0000000000");
          this.dropdownList=[{id:1,usrname:''}];
        } else{
        this.userlist=this.userlist.extraData.User;   
       
          console.log("=============================scrb>!!!!!!!!!!!0000000000");
          this.userlist.forEach(data => {
           // let radom=Math.floor(Math.random() * 99999) + 1;
           // console.log('{id:radom,username:data.username}',{id:radom,username:data.username});
            
            this.dropdownList.push({id:data.uuid,username:data.username});
           
          });
         
        }
      }
      }, //For Success Response
      (err) => {
        console.log("got error", err)
        //  self.serverDataLogin=err;
      } //For Error Response
    );

};


onItemSelect(item:any) {
console.log("item.usernameitem.username",item);
this.groupMember.push(item);
console.log("item.username",this.groupMember);
}

onItemDeSelect(item:any)
{
// console.log("this.groupMember.indexOf(item)",item,this.groupMember.indexOf(item.username));
 this.groupMember=this.groupMember.filter(x=>x.username!=item.username)  // lamda expression
console.log("groupmemb",this.groupMember);
// this.groupMember.splice(this.groupMember.indexOf(item.username,),1);
// console.log("slice",this.groupMember);
}




onSelectAll(items: any) {

this.groupMember=items;
console.log(this.groupMember);
}


UnSelectAll(items:any)
{
this.groupMember=[];
console.log("remove",this.groupMember);
}

clearSearchFilter(){
this.dropdownList=[];

}

// onIndFilterChange(event){
//   // $('.dropdown-list:nth-child(2) li input').remove();
// }

open(content) {
this.modalService.open(content);
}



};







