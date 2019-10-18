// Make connection
//var socket = io.connect(window.location.hostname+":8080");
//var socket = io.connect(window.location.hostname);
var socket = io.connect("https://pacific-mesa-89562.herokuapp.com");

let new_User='';
var user=[];
let userList=[];
// Query DOM and inputs

var send=document.getElementById('send');




//send.addEventListener('click' function(){
//	alert('hello');
//})



function sendbtn(){
	alert("check sendbtn");
}
	

let lg=console.log;
let handler; //= document.getElementById('handler'),
let feedback = $('#feedback');
$('#message').focus()
var person = prompt("Please enter your name:", "Harry Potter");
    if (person == null || person == "") {
        handler="Default User";
    } else {
        handler=person;
}
$('#userNameid').html(handler)
new_User=handler
setUsername()
function setUsername() {
id = Math.floor(Date.now() * Math.random());
socket.emit('setUsername', handler);
};
socket.on('userExists', function(data) {
    $('#sendbtn').prop('disabled', true)
    $('#error-container').html(data);
});
socket.on('userSet', function(data) {
user=data.users;
let newUserName = data.newUser.userName;
$('#sendbtn').prop('disabled', false)
//letme(newUserName)
$('#output').append('<p class="feeduser'+ newUserName + '"><strong>' + newUserName + ' is added</strong></p>');
});
onlineUser()
function onlineUser(){
socket.emit('getOnlineUsers',null);
socket.on('onlineUsers',function(userList){
    if (userList.length > 1) {
        $('#onlineUsers').html('')
        $('#onlineUsers').append('<b>Online Users</b>');
        for(var i=0;i<=userList.length-1;i++){
            if(userList[i]!=handler){
                var ptag = "<p>" + userList[i] + "</p>";
                $('#onlineUsers').append(ptag);
            } else{
                var ptag = "<p> You </p>";
                $('#onlineUsers').append(ptag);
            }
        }
    } else {
        $('#onlineUsers').html('')
        var ptag="<p>No one is Online</p>";
        $('#onlineUsers').append(ptag);
    }
})
}

socket.on('disconnected', function (leftUser) {
    onlineUser()
    $('#output').append('<p class="feeduser' + leftUser + '"><strong>' + leftUser + ' left</strong></p>');
        
});
function chatEmit() {
    socket.emit('chat', {
        message: $('#message').val(),
        handle: handler
    });
    $('#message').val('');
    $('#message').focus()
}
// Emit events
$('#sendbtn').click(() => {
    chatEmit();
});
$('#message').keydown( function(){
    socket.emit('typing', handler);
})

$('#message').keyup( function(){
	alert('erere');
    $('#feedback').html('');
})

// Listen for events
socket.on('chat', function(data){
    feedback.html('');
    if(data.handle==new_User)
        $('#output').append('<p class="animated fadeIn"><strong>You : </strong>' + data.message + '</p>');
    else
        $('#output').append('<p><strong>' + data.handle + ': </strong>' + data.message + '</p>');

    $('#chat-window').animate({
        scrollTop: $('#chat-window').get(0).scrollHeight
    }, 1000)
});

socket.on('typing', function (data) {
    feedback.html('<p><em>' + data + ' is typing a message...</em></p>');
});

$('#message').keydown(function (e) {
    if (e.which == 13)
        $('#sendbtn').click()
});

