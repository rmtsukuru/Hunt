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

Beast.prototype.moveChance = function() {
    if (this.health <= 0.25 * BEAST_HP) {
        return 0.3;
    }
    else {
        return 0.6;
    }
}


Beast.prototype.timerFrames = function() {
    if (this.health < 0.5 * BEAST_HP) {
        return BEAST_TIMER_FRAMES / 2;
    }
    else {
        return BEAST_TIMER_FRAMES;
    }
}

Beast.prototype.speed = function() {
    if (this.health <= 0.25 * BEAST_HP) {
        return BEAST_SPEED / 2;
    }
    else if (this.health < 0.5 * BEAST_HP) {
        return 2 * BEAST_SPEED;
    }
    else {
        return BEAST_SPEED;
    }
};

Beast.prototype.think = function() {
    this.xVelocity = 0;
    this.yVelocity = 0;
    if (Math.random() < this.moveChance()) {
        if (Math.random() <= 0.5) {
            this.xVelocity = this.speed();
            if (Math.random() < 0.5) {
                this.xVelocity *= -1;
            }
        }
        else {
            this.yVelocity = this.speed();
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
        this.thoughtTimer = this.timerFrames();
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
