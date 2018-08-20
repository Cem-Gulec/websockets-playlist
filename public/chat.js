// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback =document.getElementById('feedback');
      clear =document.getElementById('clear');

// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});


message.addEventListener('keypress',function(event){
  socket.emit('typing',handle.value);
});

message.addEventListener('keyup', function(event) {

  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {

    socket.emit('chat2', {
        message: message.value,
        handle: handle.value
    });
      message.value="";
    // Trigger the button element with a click
    document.getElementById('btn').click();


  }
});

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('chat2', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});


socket.on('typing',function(data){
  feedback.innerHTML ='<p><em>'+data+' is typing a message...</em></p>'
});
