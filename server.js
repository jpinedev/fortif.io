const express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let users = {};
let colorMap = {};
let worldSize = { width: 64, height: 64 };

app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
    console.log(`new connection, ID: ${socket.id}`);
    socket.on('disconnect', function(){
        console.log(`lost connection, ID: ${socket.id}`);
    });

    socket.on('register-user', (name) => {
        if(!users[name]) {
            const color = '#' +
                Math.trunc(Math.random()*155+100).toString(16) +
                Math.trunc(Math.random()*155+100).toString(16) +
                Math.trunc(Math.random()*155+100).toString(16);
            colorMap[name] = color;
            users[name] = {
                pos: { x: 0, y: 0 },
                color: color,
                flags: [],
                online: true
            };
        }
        socket.emit('load-user', name, users[name]);
    });

    socket.on('init-world', () => {
        socket.emit('init-world', worldSize, getWorldState(), colorMap);
    });

    socket.on('pong-player', (player, name, newEntities) => {
        if(name) {
            users[name] = player;
            newEntities.forEach(entity => {
                users[name][entity.kind].push(entity.entity);
            });
        }
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
  setInterval(() => {
      io.emit('ping-players', users, colorMap);
  }, 33);
});

function getWorldState() {
    let worldState = {
        players: [],
        flags: []
    };
    Object.keys(users).forEach((name) => {
        const user = users[name];
        worldState.players.push({
            name: name,
            color: user.color,
            pos: user.pos,
            online: user.online
        });
        user.flags.forEach((flag) => {
            worldState.flags.push({
                player: name,
                level: flag.level,
                pos: flag.pos
            });
        });
    });

    return worldState;
}