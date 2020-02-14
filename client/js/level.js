const MAXHP_WALL1 = 5,
    MAXHP_WALL2 = 10,
    MAXHP_WALL3 = 18;
const MAXHP_TURRET = 8;

const RANGE_TURRET = 6,
    RANGE_TURRET_UPGRADE = 3;

function getMaxWallHP(level) {
    if(level == 2) return MAXHP_WALL3;
    else if(level == 1) return MAXHP_WALL2;
    else return MAXHP_WALL1;
}

function getMaxTurretHP() {
    return MAXHP_TURRET;
}

function getTurretRange(upgrades) {
    return (upgrades.range ? RANGE_TURRET + RANGE_TURRET_UPGRADE : RANGE_TURRET);
}

function getTurretColor(upgrades) {
    return '#505050'
}

function claimTiles(flagLevel, x, y) {
    if(flagLevel == 0) {
        //by verticle slices
        claimArea(x - 1, y - 2, 3, 5);
        claimArea(x - 2, y - 1, 1, 3);
        claimArea(x + 2, y - 1, 1, 3);
    } else if(flagLevel == 1) {
        //by verticle slices
        claimArea(x - 4, y - 2, 1, 5);
        claimArea(x - 3, y - 3, 1, 7);
        claimArea(x - 2, y - 4, 5, 9);
        claimArea(x + 3, y - 3, 1, 7);
        claimArea(x + 4, y - 2, 1, 5);
    } else if(flagLevel == 2) {
        //by verticle slices
        claimArea(x - 6, y - 2, 1, 5);
        claimArea(x - 5, y - 4, 1, 9);
        claimArea(x - 4, y - 5, 2, 11);
        claimArea(x - 2, y - 6, 5, 13);
        claimArea(x + 3, y - 5, 2, 11);
        claimArea(x + 5, y - 4, 1, 9);
        claimArea(x + 6, y - 2, 1, 5);
    }
}
function claimArea(x, y, width, height) {
    for(let i = x; i < x + width; i++) {
        for(let j = y; j < y + height; j++) {
            claimTile(i, j);
        }
    }
}
function claimTile(x, y) {
    if(x < 0 || y < 0 || x >= worldSize.width || y >= worldSize.height) return;
    if(!user.tiles.some(pos => pos.x == x && pos.y == y)) user.tiles.push({ x: x, y: y });
}