let socket = io();
const dispName = document.querySelector('#dispName');
const canvas = document.querySelector('#canvas');
let c = canvas.getContext('2d');

let name;
let user = {};
let world = {};
let worldSize = {};

let colorMap = {};

const tileSize = 20;

socket.emit('register-user', prompt('Enter your username: '));
socket.on('load-user', (userName, userInfo) => {
    name = userName;
    user = userInfo;
    dispName.innerHTML = name;
    console.table(user);
    socket.emit('init-world');
});
socket.on('init-world', (worldInfo, worldState) => {
    world = worldState;
    worldSize = worldInfo;
    console.log(world);
    world.players.forEach((player) => {
        colorMap[player.name] = player.color;
    });
    init();
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
