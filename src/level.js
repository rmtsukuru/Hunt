function drawBackgroundTiles() {
    for (var i = 0; i < tiles.length; i++) {
        for (var j = 0; j < tiles[i].length; j++) {
            if (tiles[i][j] == 1) {
                drawRect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE, '#f00');
            }
        }
    }
}

function drawForegroundTiles() {
    for (var i = 0; i < tiles.length; i++) {
        for (var j = 0; j < tiles[i].length; j++) {
            if (tiles[i][j] == 2) {
                drawRect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE, '#00f');
            }
        }
    }
}

function isTilePassable(j, i) {
    var value = tiles[i][j];
    return value == 0 || value == 2;
}

function tileIndex(x) {
    return Math.floor(x / TILE_SIZE);
}

function getLeftCollisionVelocity(entity) {
    var minTileX = tileIndex(entity.x + entity.xVelocity);
    var maxTileX = tileIndex(entity.x + 1) - 1;
    var minTileY = tileIndex(entity.y);
    var maxTileY = tileIndex(entity.y + PLAYER_SIZE - 1);
    for (var i = maxTileX; i >= minTileX; i--) {
        for (var j = minTileY; j <= maxTileY; j++) {
            if (!isTilePassable(i, j)) {
                return Math.max(i * TILE_SIZE + TILE_SIZE - entity.x, entity.xVelocity);
            }
        }
    }
    return entity.xVelocity;
}

function getRightCollisionVelocity(entity) {
    var minTileX = tileIndex(entity.x + PLAYER_SIZE - 1) + 1;
    var maxTileX = tileIndex(entity.x + PLAYER_SIZE + entity.xVelocity);
    var minTileY = tileIndex(entity.y);
    var maxTileY = tileIndex(entity.y + PLAYER_SIZE - 1);
    for (var i = minTileX; i <= maxTileX; i++) {
        for (var j = minTileY; j <= maxTileY; j++) {
            if (!isTilePassable(i, j)) {
                return Math.min(i * TILE_SIZE - (entity.x + PLAYER_SIZE), entity.xVelocity);
            }
        }
    }
    return entity.xVelocity;
}

function getUpCollisionVelocity(entity, tempX) {
    var minTileY = tileIndex(entity.y + entity.yVelocity);
    var maxTileY = tileIndex(entity.y) - 1;
    var minTileX = tileIndex(tempX);
    var maxTileX = tileIndex(tempX + PLAYER_SIZE - 1);
    for (var j = maxTileY; j >= minTileY; j--) {
        for (var i = minTileX; i <= maxTileX; i++) {
            if (!isTilePassable(i, j)) {
                return Math.max(j * TILE_SIZE + TILE_SIZE - entity.y, entity.yVelocity);
            }
        }
    }
    return entity.yVelocity;
}

function getDownCollisionVelocity(entity, tempX) {
    var minTileY = tileIndex(entity.y + PLAYER_SIZE - 1) + 1;
    var maxTileY = tileIndex(entity.y + PLAYER_SIZE + entity.yVelocity);
    var minTileX = tileIndex(tempX);
    var maxTileX = tileIndex(tempX + PLAYER_SIZE - 1);
    for (var j = minTileY; j <= maxTileY; j++) {
        for (var i = minTileX; i <= maxTileX; i++) {
            if (!isTilePassable(i, j)) {
                return Math.min(j * TILE_SIZE - (entity.y + PLAYER_SIZE), entity.yVelocity);
            }
        }
    }
    return entity.yVelocity;
}

function getCollisionXVelocity(entity) {
    if (entity.xVelocity < 0) {
        return getLeftCollisionVelocity(entity);
    }
    else if (entity.xVelocity > 0) {
        return getRightCollisionVelocity(entity);
    }
    return 0;
}

function getCollisionYVelocity(entity) {
    if (entity.yVelocity < 0) {
        return getUpCollisionVelocity(entity, entity.x + entity.xVelocity);
    }
    else if (entity.yVelocity > 0) {
        return getDownCollisionVelocity(entity, entity.x + entity.xVelocity);
    }
    return 0;
}

function handleTileCollision(entity) {
    entity.xVelocity = getCollisionXVelocity(entity);
    entity.yVelocity = getCollisionYVelocity(entity);
}

