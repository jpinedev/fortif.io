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
const halfTile = 10;

socket.emit('register-user', prompt('Enter your username: '));
socket.on('load-user', (userName, userInfo) => {
    name = userName;
    user = userInfo;
    dispName.innerHTML = name;
    socket.emit('init-world');
});
socket.on('failed-load-user', (msg) => {
    alert(msg);
    socket.emit('register-user', prompt('Enter your username: '));
});
socket.on('init-world', (worldInfo, worldState, serverColorMap) => {
    world = worldState;
    worldSize = worldInfo;
    colorMap = serverColorMap;
    gameEngine.init();
});
socket.on('ping-players', (users, serverColorMap) => {
    colorMap = serverColorMap;
    world = updateWorld(users);
    socket.emit('pong-player', user, name, newEntities);
    newEntities = [];
});
socket.on('login', (player) => {
    console.log(player + ' joined the game.');
});
socket.on('logout', (player) => {
    console.log(player + ' left the game.');
});

function addFlag(level, x, y) {
    const flag = {
        level: level,
        pos: {x: x, y: y}
    };
    user.flags.push(flag);
    claimTiles(level, x, y);
}
function addWall(level, x, y) {
    const maxWallHP = getMaxWallHP(level);
    const wall = {
        level: level,
        pos: {x: x, y: y},
        hpMax: maxWallHP,
        hp: maxWallHP 
    };
    user.walls.push(wall);
}
function addTurret(x, y, upgrades) {
    const maxTurretHP = getMaxTurretHP();
    let turretUpgrades = (upgrades ? upgrades : {speed: false, range: false, laser: false});
    const turret = {
        pos: {x: x, y: y},
        upgrades: turretUpgrades,
        range: getTurretRange(turretUpgrades),
        angle: PI2 / 4,
        hpMax: maxTurretHP,
        hp: maxTurretHP 
    };
    user.turrets.push(turret);
}

function updateWorld(users) {
    let tempWorld = {
        players: [],
        flags: [],
        walls: [],
        turrets: [],
        claimedTiles: {}
    };
    Object.keys(users).forEach((name) => {
        const player = users[name];
        if(player.online) {
            tempWorld.players.push({
                name: name,
                color: player.color,
                pos: player.pos,
                vel: player.vel,
                online: player.online
            });
        }
        player.flags.forEach((flag) => {
            tempWorld.flags.push({
                player: name,
                level: flag.level,
                pos: flag.pos
            });
        })
        player.walls.forEach((wall) => {
            tempWorld.walls.push({
                player: name,
                level: wall.level,
                pos: wall.pos,
                hpMax: wall.hpMax,
                hp: wall.hp
            });
        })
        player.turrets.forEach((turret) => {
            tempWorld.turrets.push({
                player: name,
                pos: turret.pos,
                upgrades: turret.upgrades,
                range: turret.range,
                angle: turret.angle,
                hpMax: turret.hpMax,
                hp: turret.hp 
            });
        });
        player.tiles.forEach((tile) => {
            const key = (tile.y * worldSize.height + tile.x).toString();
            if(!tempWorld.claimedTiles[key]) tempWorld.claimedTiles[key] = [name];
            else tempWorld.claimedTiles[key].push(name);
        });
    });
    return tempWorld;
}

document.addEventListener('keydown', event => {
    gameEngine.keyDownHandler(event.code);
});
document.addEventListener('keyup', event => {
    gameEngine.keyUpHandler(event.code);
});
document.addEventListener('keypress', event => {
    gameEngine.keyPressHandler(event.code);
});

const clientRect = canvas.getBoundingClientRect();
canvas.addEventListener('click', () => {
    // if (click on ui)

    // else (place an object)

});
canvas.addEventListener('mousemove', event => {
    const rawMX = event.clientX - clientRect.left;
    const rawMY = event.clientY - clientRect.top;
    gameEngine.mouse.x = Math.floor(rawMX / tileSize);
    gameEngine.mouse.y = Math.floor(rawMY / tileSize);
});
