const PLAYER_SPEED = 5;
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
        this.xVelocity -= PLAYER_SPEED;
    }
    if (keyState.right) {
        this.xVelocity += PLAYER_SPEED;
    }
    if (keyState.up) {
        this.yVelocity -= PLAYER_SPEED;
    }
    if (keyState.down) {
        this.yVelocity += PLAYER_SPEED;
    }
    handleTileCollision(this);
    Entity.prototype.update.call(this);
};
