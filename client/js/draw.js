const PI2 = Math.PI * 2;

function drawPlayer(c, pos, color, name) {
    c.fillStyle = color;
    c.beginPath();
    c.arc((pos.x+.5) * tileSize, (pos.y+.5) * tileSize, tileSize/2, 0, PI2);
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
            c.fillRect((pos.x - 1) * tileSize, (pos.y - 4) * tileSize, 3 * tileSize, tileSize);
            c.fillRect((pos.x + 4) * tileSize, (pos.y - 1) * tileSize, tileSize, 3 * tileSize);
            c.fillRect((pos.x - 1) * tileSize, (pos.y + 4) * tileSize, 3 * tileSize, tileSize);
            c.fillRect((pos.x - 4) * tileSize, (pos.y - 1) * tileSize, tileSize, 3 * tileSize);
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

function drawNametag(c, pos, name) {
    c.font = '16px sans-serif';
    c.strokeStyle = '#00000055';
    c.lineWidth = 3;
    c.textAlign = 'center';
    c.strokeText(name, (pos.x + .5) * tileSize, (pos.y - .25) * tileSize);
    c.fillText(name, (pos.x + .5) * tileSize, (pos.y - .25) * tileSize);
}

function drawNameplate(c, pos, name) {
    c.font = '10px sans-serif';
    c.strokeStyle = '#ffffff55';
    c.lineWidth = 3;
    c.textAlign = 'center';
    c.strokeText(name, (pos.x + .5) * tileSize, (pos.y - .25) * tileSize);
    c.fillText(name, (pos.x + .5) * tileSize, (pos.y - .25) * tileSize);
}