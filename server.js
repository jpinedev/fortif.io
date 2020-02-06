const express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
    console.log(`new connection, ID: ${socket.id}`);
    socket.on('disconnect', function(){
        console.log(`lost connection, ID: ${socket.id}`);
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});