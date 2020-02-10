const MAXHP_WALL1 = 5,
    MAXHP_WALL2 = 10,
    MAXHP_WALL3 = 18;
const MAXHP_TURRET = 8;

const RANGE_TURRET = 6,
    RANGE_TURRET_UPGRADE = 3;

function isInFlag(pos, flag) {
    return false;
}

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