const express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let users = {};
let colorMap = {};
let usersIDMap = {};
let worldSize = { width: 64, height: 64 };

app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
    console.log(`new connection, ID: ${socket.id}`);
    socket.on('disconnect', function(){
        console.log(`lost connection, ID: ${socket.id}`);
        Object.keys(usersIDMap).forEach(name => {
            if(usersIDMap[name] == socket.id) {
                usersIDMap[name] = undefined;
                users[name].online = false;
                socket.broadcast.emit('logout', name);
            }
        });
    });

    socket.on('register-user', (name) => {
        if(name == null) socket.emit('failed-load-user', 'Error: No username provided');
        if(!users[name]) {
            const color = '#' +
                Math.trunc(Math.random()*155+100).toString(16) +
                Math.trunc(Math.random()*155+100).toString(16) +
                Math.trunc(Math.random()*155+100).toString(16);
            colorMap[name] = color;
            users[name] = {
                pos: { x: 0, y: 0 },
                vel: { x: 0, y: 0 },
                color: color,
                flags: [],
                tiles: [],
                walls: [],
                turrets: [],
                online: true
            };
            usersIDMap[name] = socket.id;
            socket.emit('load-user', name, users[name]);
            socket.broadcast.emit('login', name);
        } else if(!usersIDMap[name]) {
            users[name].online = true;
            socket.emit('load-user', name, users[name]);
            usersIDMap[name] = socket.id;
            socket.broadcast.emit('login', name);
        } else {
            socket.emit('failed-load-user', `Error: Username "${name}" already in use`);
        }
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
        flags: [],
        walls: [],
        turrets: [],
        claimedTiles: {}
    };
    Object.keys(users).forEach((name) => {
        const user = users[name];
        if(user.online) {
            worldState.players.push({
                name: name,
                color: user.color,
                pos: user.pos,
                vel: user.vel,
                online: user.online
            });
        }
        user.flags.forEach((flag) => {
            worldState.flags.push({
                player: name,
                level: flag.level,
                pos: flag.pos
            });
        })
        user.walls.forEach((wall) => {
            worldState.walls.push({
                player: name,
                level: wall.level,
                pos: wall.pos,
                hpMax: wall.hpMax,
                hp: wall.hp 
            });
        })
        user.turrets.forEach((turret) => {
            worldState.turrets.push({
                player: name,
                pos: turret.pos,
                upgrades: turret.upgrades,
                range: turret.range,
                angle: turret.angle,
                hpMax: turret.hpMax,
                hp: turret.hp 
            });
        });
        user.tiles.forEach((tile) => {
            const key = (tile.y * worldSize.height + tile.x).toString();
            if(!worldState.claimedTiles[key]) worldState.claimedTiles[key] = [name];
            else worldState.claimedTiles[key].push(name);
        });
    });

    return worldState;
}