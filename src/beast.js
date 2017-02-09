const BEAST_SPEED = 3;
const BEAST_TIMER_FRAMES = 30;
const BEAST_HP = 200;

function Beast(x, y) {
    Entity.call(this, x, y);
    this.width = this.height = 32;
    this.color = '#224';
    this.health = BEAST_HP;
    this.thoughtTimer = 0;
    this.yVelocity = BEAST_SPEED;
}

Beast.prototype = Object.create(Entity.prototype);

Beast.prototype.think = function() {
    this.xVelocity = 0;
    this.yVelocity = 0;
    if (Math.random() < 0.6) {
        if (Math.random() <= 0.5) {
            this.xVelocity = BEAST_SPEED;
            if (Math.random() < 0.5) {
                this.xVelocity *= -1;
            }
        }
        else {
            this.yVelocity = BEAST_SPEED;
            if (Math.random() <= 0.5) {
                this.yVelocity *= -1;
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
    handleEntityCollision(this);
    Entity.prototype.update.call(this);
};

Beast.prototype.handleEntityCollision = function(entity) {
    if (entity.active) {
        var startingHealth = this.health;
        this.health -= entity.damage(this);
        if (this.health != startingHealth) {
            console.log('Beast HP: ' + this.health);
        }
    }
};
