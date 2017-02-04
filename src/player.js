const SPEED = 5;
const PLAYER_SIZE = 32;

function Player(x, y) {
    Entity.call(this, x, y);
    this.size = PLAYER_SIZE;
    this.color = '#a22'; 
}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
    this.xVelocity = 0;
    this.yVelocity = 0;
    if (keyState.left) {
        this.xVelocity -= SPEED;
    }
    if (keyState.right) {
        this.xVelocity += SPEED;
    }
    if (keyState.up) {
        this.yVelocity -= SPEED;
    }
    if (keyState.down) {
        this.yVelocity += SPEED;
    }
    handleTileCollision(this);
    Entity.prototype.update.call(this);
}
