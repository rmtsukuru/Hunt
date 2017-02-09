const PLAYER_SPEED = 5;
const PLAYER_SIZE = 32;

const directions = {
    left: 0,
    right: 1,
    up: 2,
    down: 3
};

function Player(x, y) {
    Entity.call(this, x, y);
    this.width = this.height = PLAYER_SIZE;
    this.color = '#a22';
    this.swordDrawn = false;
    this.facing = directions.down;
}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
    this.xVelocity = 0;
    this.yVelocity = 0;
    if (!this.swordDrawn) {
        if (keyState.z) {
            var sword;
            if (this.facing == directions.left) {
                sword = new Sword(this.x - 32, this.y + 12, true);
            }
            else if (this.facing == directions.right) {
                sword = new Sword(this.x + 32, this.y + 12, true);
            }
            else if (this.facing == directions.up) {
                sword = new Sword(this.x + 12, this.y - 32);
            }
            else {
                sword = new Sword(this.x + 20, this.y + 32);
            }
            entities.unshift(sword);
            this.swordDrawn = true;
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

            if (this.yVelocity == 0) {
                if (this.xVelocity < 0) {
                    this.facing = directions.left;
                }
                else if (this.xVelocity > 0) {
                    this.facing = directions.right;
                }
            }
            else if (this.xVelocity == 0) {
                if (this.yVelocity < 0) {
                    this.facing = directions.up;
                }
                else if (this.yVelocity > 0) {
                    this.facing = directions.down;
                }
            }
        }
    }
    handleTileCollision(this);
    Entity.prototype.update.call(this);
};
