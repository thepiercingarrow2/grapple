var express = require('express'), app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var port = process.env.PORT || 8000;

http.listen(port);
console.log('listening on port %d', port);
app.use(express.static('client'));

var players = new Map();
var grapplers = new Map();
var arena = new Set();

function Player(name) {
    this.name = name;
}

io.on('connection', onconnect);

function onconnect(socket) {
    players.set(socket.id, {});
    io.emit('msg', {type: 'sys', msg: 'An unnamed grappler has connected.'});
    players.get(socket.id).name = 'Unnamed grappler';

    socket.on('spawn', function(){
	grapplers.set(socket.id, new Player(players.get(socket.id).name));
	socket.join('arena');
    });

    socket.on('new-input', (input) => {
    	if (grapplers.has(socket.id))
	    grapplers.get(socket.id).input.update = input;
    });

    socket.on('name-change', (name) => {
	io.emit('msg', {type: 'sys', msg: '\'' + players.get(socket.id).name + '\' has changed their name to \'' + name + '\'.'});
	players.get(socket.id).name = name;
	if (grapplers.get(socket.id))
	    grapplers.get(socket.id).name = name;
    });

    socket.on('chat', function(msg){
	io.emit('msg', {msg: msg, type: 'p', player: players.get(socket.id).name});
    });

    socket.on('disconnect', function(p){
	io.emit('msg', {msg: '\'' + players.get(socket.id).name + '\' has disconnected', type: "sys"});
	grapplers.delete(socket.id);
	players.delete(socket.id);
    })
}

function physics() {
    //TODO: parse player input
}

function send_arena() {
    io.to('arena').emit('players', arena);
}

setInterval(physics, 15);
setInterval(send_arena, 45);
