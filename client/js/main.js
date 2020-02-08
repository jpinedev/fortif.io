let socket = io();
const dispName = document.querySelector('#dispName');
const canvas = document.querySelector('#canvas');
let c = canvas.getContext('2d');

let name;
let user = {};
let world = {};
let worldSize = {};
let newEntities = [];

let colorMap = {};

const tileSize = 20;

socket.emit('register-user', prompt('Enter your username: '));
socket.on('load-user', (userName, userInfo) => {
    name = userName;
    user = userInfo;
    dispName.innerHTML = name;
    socket.emit('init-world');
});
socket.on('init-world', (worldInfo, worldState, serverColorMap) => {
    world = worldState;
    worldSize = worldInfo;
    colorMap = serverColorMap;
    init();
});
socket.on('ping-players', (users, serverColorMap) => {
    let tempWorld = {
        players: [],
        flags: []
    };
    Object.keys(users).forEach((name) => {
        const player = users[name];
        tempWorld.players.push({
            name: name,
            color: player.color,
            pos: player.pos,
            online: player.online
        });
        player.flags.forEach((flag) => {
            tempWorld.flags.push({
                player: name,
                level: flag.level,
                pos: flag.pos
            });
        });
    });
    colorMap = serverColorMap;
    world = tempWorld;
    socket.emit('pong-player', user, name, newEntities);
    newEntities = [];
});

function init() {
    canvas.width = worldSize.width * tileSize;
    canvas.height = worldSize.height * tileSize;
    update();
}

function update() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    world.players.forEach(player => {
        if(player.name != name) drawPlayer(c, player.pos, player.color, player.name);
    });

    world.flags.forEach(flag => {
        drawFlag(c, flag.pos, flag.level, colorMap[flag.player], flag.player);
    });

    drawPlayer(c, user.pos, user.color, name)
    requestAnimationFrame(update);
}

function addFlag(level, x, y) {
    const flag = {
        level: level,
        pos: {x: x, y: y}
    };
    user.flags.push(flag);
}