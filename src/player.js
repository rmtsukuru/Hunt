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
    if (keyState.left || keyState.a) {
        this.xVelocity -= PLAYER_SPEED;
    }
    if (keyState.right || keyState.d) {
        this.xVelocity += PLAYER_SPEED;
    }
    if (keyState.up || keyState.w) {
        this.yVelocity -= PLAYER_SPEED;
    }
    if (keyState.down || keyState.s) {
        this.yVelocity += PLAYER_SPEED;
    }
    handleTileCollision(this);
    Entity.prototype.update.call(this);
};
