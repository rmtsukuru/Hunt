const BEAST_SPEED = 3;
const BEAST_TIMER_FRAMES = 90;

function Beast(x, y) {
    Entity.call(this, x, y);
    this.size = 32;
    this.color = '#224';
    this.thoughtTimer = 0;
    this.yVelocity = BEAST_SPEED;
}

Beast.prototype = Object.create(Entity.prototype);

Beast.prototype.think = function() {
    if (Math.random() < 0.6) {
        if (Math.random() < 0.5) {
            this.yVelocity = 0;
            this.xVelocity = BEAST_SPEED;
            if (Math.random() < 0.5) {
                this.xVelocity *= -1;
            }
        }
        else {
            this.xVelocity = 0;
            this.yVelocity = BEAST_SPEED;
            if (Math.random() < 0.5) {
                this.xVelocity *= -1;
            }
        }
    }
};

Beast.prototype.update = function() {
    // Handle speed and such.
    if (this.thoughtTimer <= 0) {
        this.think();
        this.thoughtTimer = BEAST_TIMER_FRAMES;
    }
    else {
        this.thoughtTimer--;
    }
    handleTileCollision(this);
    Entity.prototype.update.call(this);
};
