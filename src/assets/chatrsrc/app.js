/**
* Module dependencies.
*/

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var socket = require('socket.io');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
   app.use(express.errorHandler());
}

app.get('/', routes.index);


let server=http.createServer(app).listen(app.get('port'), function () {
   console.log('Express server listening on port ' + app.get('port'));
});

users = [];
let lg = console.log;

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {
   let userName = "";
   console.log('made socket connection', socket.id);
   socket.on('setUsername', function (data) {
       if (!users.some(x => x.userName == data)) {
           let newUser = { 'userName': data, 'id': socket.id };
           users.push(newUser);
           //lg(JSON.stringify(users))
           socket.broadcast.emit('userSet', { 'newUser': newUser, 'users': users });
       } else {
           socket.emit('userExists', data + ' username is taken! Try some other username.');
       }
   })

   // Get online users
   socket.on('getOnlineUsers', function () {
       if (users.length > 0) {
           let userList = users.map(x => x.userName)
           io.sockets.emit('onlineUsers', userList);
       }
   })



   // Handle chat event
   socket.on('chat', function (Udata) {
       // console.log(data);

   });

   // Handle typing event
   socket.on('typing', function (data) {
       socket.broadcast.emit('typing', data);
   });
   socket.on('disconnect', function () {
       let row = users.find(x => x.id == socket.id)
       if (typeof row !== 'undefined' && row) {
           socket.broadcast.emit('disconnected', row.userName);
           users.splice(users.indexOf(row), 1);
           //lg('Disconnected User====>',row.userName)
       }
   });
});