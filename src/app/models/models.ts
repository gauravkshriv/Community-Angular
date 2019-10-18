export interface ICategory{
  category:string,
}

export interface IQuestions{
  id:number,
  title:string,
  description:string,
  postedOn:string,
  user:IUser,
  replyCount:number,
  likesCount:number,
  dislikesCount:number,
  comments:IComments[],
  likeDislike:ILikeDislike[],
  attachment:IAttachment[],
  viewsCount:number,
  lastReply:Date
}

export interface IUser{
  uuid:string,
  name:string,
  username:any;
  occupation:string
}

export interface IComments{
  id:number,
  comment:string,
  postenOn:string,
  user:IUser,
  commentReplies:ICommentReplies[]
}

export interface ICommentReplies{
  id:number,
  reply:string,
  postenOn:string,
  user:IUser,
}

export interface ILikeDislike{
  id:number,
  user:IUser,
  likeOrDislike:boolean,

}

export interface IAttachment{
  id:number,
  file:string
}

export interface ApiUser
{
  uuid:any;
  sessiontoken:any;
  jwttoken:any;
  username:any;
  fullname:any;
}



export interface ChatUser
{
socket:SocketIOClient.Socket;
new_User:any;

profiledata:any;
isNewGroup:boolean;
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
GroupChat:boolean;
partner:any;
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

jwttoken:any;
storageRef:any;
searchname:any;
userlist:any;

searchText : string;
customerData : any;
}





