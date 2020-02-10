const PI2 = Math.PI * 2;

function drawPlayer(c, pos, color, name) {
    c.fillStyle = color;
    c.beginPath();
    c.arc((pos.x+.5) * tileSize, (pos.y+.5) * tileSize, halfTile, 0, PI2);
    c.closePath();
    c.fill();
    drawNametag(c, pos, name);
}

function drawFlag(c, pos, level, color, name) {
    c.fillStyle = color;
    c.fillRect(pos.x * tileSize, pos.y * tileSize, tileSize, tileSize);
    c.globalAlpha = 0.2;
    switch(level) {
        case 0:
            c.fillRect((pos.x - 1) * tileSize, (pos.y - 2) * tileSize, 3 * tileSize, 5 * tileSize);
            c.fillRect((pos.x - 2) * tileSize, (pos.y - 1) * tileSize, tileSize, 3 * tileSize);
            c.fillRect((pos.x + 2) * tileSize, (pos.y - 1) * tileSize, tileSize, 3 * tileSize);
            break;
        case 1:
            c.fillRect((pos.x - 3) * tileSize, (pos.y - 3) * tileSize, 7 * tileSize, 7 * tileSize);
            c.fillRect((pos.x - 2) * tileSize, (pos.y - 4) * tileSize, 5 * tileSize, tileSize);
            c.fillRect((pos.x + 4) * tileSize, (pos.y - 2) * tileSize, tileSize, 5 * tileSize);
            c.fillRect((pos.x - 2) * tileSize, (pos.y + 4) * tileSize, 5 * tileSize, tileSize);
            c.fillRect((pos.x - 4) * tileSize, (pos.y - 2) * tileSize, tileSize, 5 * tileSize);
            break;
        case 2:
            c.fillRect((pos.x - 2) * tileSize, (pos.y - 6) * tileSize, 5 * tileSize, tileSize);
            c.fillRect((pos.x - 4) * tileSize, (pos.y - 5) * tileSize, 9 * tileSize, tileSize);
            c.fillRect((pos.x - 5) * tileSize, (pos.y - 4) * tileSize, 11 * tileSize, 2 * tileSize);
            c.fillRect((pos.x - 6) * tileSize, (pos.y - 2) * tileSize, 13 * tileSize, 5 * tileSize);
            c.fillRect((pos.x - 5) * tileSize, (pos.y + 3) * tileSize, 11 * tileSize, 2 * tileSize);
            c.fillRect((pos.x - 4) * tileSize, (pos.y + 5) * tileSize, 9 * tileSize, tileSize);
            c.fillRect((pos.x - 2) * tileSize, (pos.y + 6) * tileSize, 5 * tileSize, tileSize);
            break;
    }
    c.globalAlpha = 1;
    drawNameplate(c, pos, name);
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

function drawTurret(c, pos, color, upgrades, range, angle) {
    const turretColor = getTurretColor(upgrades);

    c.strokeStyle = color;
    c.fillStyle = '#ff000033';
    c.beginPath();
    c.arc((pos.x + .5) * tileSize, (pos.y + .5) * tileSize, range * tileSize, 0, PI2);
    c.closePath();
    c.fill();
    c.stroke();

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
    c.fillText(name, (pos.x + .5) * tileSize, (pos.y - .25) * tileSize);
}

function drawNameplate(c, pos, name) {
    c.font = '10px sans-serif';
    c.strokeStyle = '#ffffff55';
    c.lineWidth = 3;
    c.textAlign = 'center';
    //c.strokeText(name, (pos.x + .5) * tileSize, (pos.y - .25) * tileSize);
    c.fillText(name, (pos.x + .5) * tileSize, (pos.y - .25) * tileSize);
}