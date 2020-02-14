const playerSpeed = 6; // Grid squares per second
const playerSpeedMS = playerSpeed / 1000; // Grid squares per ms

window.requestAnimationFrame = window.requestAnimationFrame || function(callback){window.setTimeout(callback,16)};

let keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

let gameEngine = {
    start: Date.now(),
    mouse: {x: 0, y: 0},
    init() {
        canvas.width = worldSize.width * tileSize;
        canvas.height = worldSize.height * tileSize;
        gameEngine.start = Date.now();
        gameEngine.frame();
    },
    update(dt) {
        let vel = { x: 0, y: 0 };
        if(keys.left) vel.x -= 1;
        if(keys.right) vel.x += 1;
        if(keys.up) vel.y -= 1;
        if(keys.down) vel.y += 1;
    
        if(Math.abs(vel.x) + Math.abs(vel.y) > 1) {
            vel.x /= Math.SQRT2;
            vel.y /= Math.SQRT2;
        }
    
        user.vel = vel;
        user.pos.x += user.vel.x * playerSpeedMS * dt;
        user.pos.y += user.vel.y * playerSpeedMS * dt;

        world.players.forEach(player => {
            if(player.name != name) {
                player.pos.x += player.vel.x * playerSpeedMS * dt;
                player.pos.y += player.vel.y * playerSpeedMS * dt;
            }
        });
    },
    render() {
        c.clearRect(0, 0, canvas.width, canvas.height);

        Object.keys(world.claimedTiles).forEach(key => {
            const raw = parseInt(key);
            const x = raw % 64;
            const y = Math.trunc(raw / 64);
            drawTile(c, x, y, world.claimedTiles[key]);
        });
    
        world.flags.forEach(flag => {
            drawFlag(c, flag.pos, colorMap[flag.player], flag.player, gameEngine.mouse);
        });
    
        world.walls.forEach(wall => {
            drawWall(c, wall.pos, wall.level, colorMap[wall.player], wall.hpMax, wall.hp);
        });
    
        world.turrets.forEach(turret => {
            drawTurret(c, turret.pos, colorMap[turret.player], turret.upgrades, turret.range, turret.angle, gameEngine.mouse);
        });

        world.players.forEach(player => {
            if(player.name != name) drawPlayer(c, player.pos, player.color, player.name);
        });
    
        drawPlayer(c, user.pos, user.color, name);
    },
    frame() {
        const dt = Date.now() - gameEngine.start;
        gameEngine.update(dt);
        gameEngine.start = Date.now();
        gameEngine.render();
        gameEngine.frameCount++;
        window.requestAnimationFrame(gameEngine.frame);
    },
    keyDownHandler(keyName) {
        switch(keyName) {
        case 'KeyW':
            keys.up = true;
            break;
        case 'KeyS':
            keys.down = true;
            break;
        case 'KeyA':
            keys.left = true;
            break;
        case 'KeyD':
            keys.right = true;
            break;
        }
    },
    keyUpHandler(keyName) {
        switch(keyName) {
        case 'KeyW':
            keys.up = false;
            break;
        case 'KeyS':
            keys.down = false;
            break;
        case 'KeyA':
            keys.left = false;
            break;
        case 'KeyD':
            keys.right = false;
            break;
        }
    },
    keyPressHandler(keyName) {
        switch(keyName) {
        case 'KeyF':
            addFlag(0, Math.floor(user.pos.x), Math.floor(user.pos.y));
            break;
        }
    }

}