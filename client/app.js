var socket = io();
var name = prompt("Enter a nickname.");

$('.chatbar').bind("enterKey",function(e){
  socket.emit('chat message', name + ": " + $('.chatbar').val());
  var msg = $('.chatbar').val();
  $('.chatbar').val('');
  return false;
});

$('.chatbar').keyup(function(e){
  if(e.keyCode == 13)
    $(this).trigger("enterKey");
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

var TAU = 2 * Math.PI;
var W = window.innerWidth;
var H = window.innerHeight;

var c = document.getElementById("canvas");
c.width = W; c.height = H;
var ct = canvas.getContext("2d");
ct.drawCircle = function(x, y, r) {
  this.beginPath();
  this.arc(x,y,r,0,TAU);
  this.stroke();
};

ct.drawCircle(W/2, H/2, W/10);
