const PI2 = Math.PI * 2;

function drawPlayer(c, pos, color, name) {
    c.fillStyle = color;
    c.beginPath();
    c.arc(pos.x * tileSize, pos.y * tileSize, halfTile, 0, PI2);
    c.closePath();
    c.fill();
    drawNametag(c, pos, name);
}

function drawFlag(c, pos, color, name, mouse) {
    c.fillStyle = color;
    c.fillRect(pos.x * tileSize, pos.y * tileSize, tileSize, tileSize);
    if(pos.x == mouse.x && pos.y == mouse.y) drawNameplate(c, pos, name);
}

function drawTile(c, x, y, players) {
    const len = players.length + 4;
    c.globalAlpha = 1 / len;
    players.forEach(player => {
        c.fillStyle = colorMap[player];
        c.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    });
    c.globalAlpha = 1;
}

function drawWall(c, pos, level, color, hpMax, hp) {
    c.fillStyle = color;
    c.fillRect(pos.x * tileSize, pos.y * tileSize, tileSize, tileSize);
    let wallColor = '';
    switch(level) {
        case 0:
            wallColor = '#b56400';
            break;
        case 1:
            wallColor= '#b5b5b5';
            break;
        case 2:
            wallColor = '#ffcc00';
            break;
    }
    c.fillStyle = wallColor;
    const height = halfTile * hp / hpMax;
    c.fillRect((pos.x + .25) * tileSize, (pos.y + .25) * tileSize + halfTile - height, halfTile, height);
}

function drawTurret(c, pos, color, upgrades, range, angle, mouse) {
    const turretColor = getTurretColor(upgrades);

    if(pos.x == mouse.x && pos.y == mouse.y) {
        c.strokeStyle = color;
        c.fillStyle = '#ff000033';
        c.beginPath();
        c.arc((pos.x + .5) * tileSize, (pos.y + .5) * tileSize, range * tileSize, 0, PI2);
        c.closePath();
        c.fill();
        c.stroke();
    }

    c.strokeStyle = turretColor;
    c.beginPath();
    c.moveTo((pos.x + .5) * tileSize, (pos.y + .5) * tileSize);
    c.lineTo(
        (pos.x + .5) * tileSize + Math.cos(angle) * tileSize * .75,
        (pos.y + .5) * tileSize + Math.sin(angle) * tileSize * .75
    );
    c.closePath();
    c.stroke();

    c.strokeStyle = color;
    c.fillStyle = turretColor;
    c.beginPath();
    c.arc((pos.x + .5) * tileSize, (pos.y + .5) * tileSize, halfTile, 0, PI2);
    c.closePath();
    c.fill();
    c.stroke();
}

function drawNametag(c, pos, name) {
    c.font = '16px sans-serif';
    c.strokeStyle = '#00000055';
    c.lineWidth = 3;
    c.textAlign = 'center';
    //c.strokeText(name, (pos.x + .5) * tileSize, (pos.y - .25) * tileSize);
    c.fillText(name, pos.x * tileSize, (pos.y - .75) * tileSize);
}

function drawNameplate(c, pos, name) {
    c.font = '10px sans-serif';
    c.strokeStyle = '#ffffff55';
    c.lineWidth = 3;
    c.textAlign = 'center';
    //c.strokeText(name, (pos.x + .5) * tileSize, (pos.y - .25) * tileSize);
    c.fillText(name, (pos.x + .5) * tileSize, (pos.y - .25) * tileSize);
}