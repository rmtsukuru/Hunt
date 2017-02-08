const PLAYER_SPEED = 5;
const PLAYER_SIZE = 32;
const PLAYER_SWORD_FRAMES = 30;

function Player(x, y) {
    Entity.call(this, x, y);
    this.width = this.height = PLAYER_SIZE;
    this.color = '#a22';
    this.swordDrawn = false;
    this.swordTimer = 0;
}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
    this.xVelocity = 0;
    this.yVelocity = 0;
    if (this.swordDrawn) {
        if (this.swordTimer <= 0) {
            this.swordDrawn = false;
        }
        else {
            this.swordTimer--;
        }
    }
    else {
        if (keyState.z) {
            var sword = new Sword(this.x + 20, this.y + 32);
            entities.unshift(sword);
            this.swordDrawn = true;
            this.swordTimer = PLAYER_SWORD_FRAMES;
        }
        else {
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
        }
    }
    handleTileCollision(this);
    Entity.prototype.update.call(this);
};
