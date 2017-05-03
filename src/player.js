const PLAYER_SPEED = 5;
const PLAYER_SIZE = 32;
const PLAYER_SPRITE_MULTIPLIER = 0.5;
const PLAYER_ANIMATION_FRAMES = 10;
const PLAYER_FRAME_COUNT = 3;

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
    this.frameTimer = PLAYER_ANIMATION_FRAMES;
    this.animationFrame = 0;
    this.preloadImages();
}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.preloadImages = function() {
    for (var i = 0; i < PLAYER_FRAME_COUNT; i++) {
        loadImage('player0' + i + '.png');
    }
    loadImage('player1.png');
    loadImage('player2.png');
    loadImage('player3.png');
}

Player.prototype.update = function() {
    this.xVelocity = 0;
    this.yVelocity = 0;
    if (!this.swordDrawn) {
        if (triggerKeyState.z) {
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
                sword = new Sword(this.x + 12, this.y + 32);
            }
            entities.unshift(sword);
            playSound('slice2', 0.5);
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
    if (Math.abs(this.xVelocity) > 0 || Math.abs(this.yVelocity) > 0) {
        if (this.frameTimer > 0 ) {
            this.frameTimer--;
        }
        else {
            this.frameTimer = PLAYER_ANIMATION_FRAMES;
            this.animationFrame++;
            this.animationFrame %= PLAYER_FRAME_COUNT;
        }
    }
    else {
        this.frameTimer = PLAYER_ANIMATION_FRAMES;
        this.animationFrame = 0;
    }
    Entity.prototype.update.call(this);
};

Player.prototype.draw = function() {
    var image;
    if (this.facing == directions.left) {
        image = 'player1' + this.animationFrame + '.png';
    }
    else if (this.facing == directions.up) {
        image = 'player2.png';
    }
    else if (this.facing == directions.right) {
        image = 'player3' + this.animationFrame + '.png';
    }
    else {
        image = 'player0' + this.animationFrame + '.png';
    }
    drawImage(image, this.x, this.y - (PLAYER_SIZE * PLAYER_SPRITE_MULTIPLIER));
};
