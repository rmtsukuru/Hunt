const BEAST_SPEED = 3;
const BEAST_SIZE = 32;
const BEAST_SPRITE_WIDTH = 24;
const BEAST_SPRITE_HEIGHT = 32;
const BEAST_RUN_SPEED = 8;
const BEAST_TIMER_FRAMES = 0.5 * FPS;
const BEAST_RUN_TIMER_FRAMES = 0.8 * FPS;
const BEAST_ECHOLOCATE_TIMER_FRAMES = 7 * FPS;
const BEAST_ANIMATION_FRAMES = 10;
const BEAST_HP = 200;
const SPOT_RADIUS = 200;
const FLASH_TIMER_FRAMES = FPS / 12;
const BLOOD_SPRAY_COUNT = 150;
const BLOOD_SPRAY_COUNT_VARIANCE = 25;
const MIN_ECHOLOCATION_VOLUME = 0.1;

function Beast(x, y) {
    Entity.call(this, x, y);
    this.width = this.height = BEAST_SIZE;
    this.health = BEAST_HP;
    this.thoughtTimer = 0;
    this.echolocateTimer = BEAST_ECHOLOCATE_TIMER_FRAMES;
    this.frameTimer = BEAST_ANIMATION_FRAMES;
    this.animationFrame = 0;
    this.facing = directions.up;
    this.spotted = false;
    this.dead = false;
    this.flashTimer = 0;
    this.runTimer = 0;
    this.filter = 'brightness(0)';
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

Beast.prototype.runTimerFrames = function() {
    return BEAST_RUN_TIMER_FRAMES;
}

Beast.prototype.running = function() {
    return this.runTimer > 0;
}

Beast.prototype.speed = function() {
    var baseSpeed = BEAST_SPEED;
    if (this.running()) {
        baseSpeed = BEAST_RUN_SPEED;
    }

    if (this.health <= 0) {
        return 0;
    }
    else if (this.health <= 0.25 * BEAST_HP) {
        return baseSpeed / 2;
    }
    else if (this.health < 0.5 * BEAST_HP) {
        return 2 * baseSpeed;
    }
    else {
        return baseSpeed;
    }
};

Beast.prototype.distanceFromPlayer = function() {
    return Math.round(Math.sqrt(Math.pow(this.x - player.x, 2) + Math.pow(this.y - player.y, 2)));
};

Beast.prototype.turnRandomDirection = function() {
    if (this.speed() > 0) {
        if (Math.random() <= 0.5) {
            this.xVelocity = this.speed();
            if ((Math.random() < 0.5 && this.x > 52) || this.x > 4300) {
                this.xVelocity *= -1;
                this.facing = directions.left;
            }
            else {
                this.facing = directions.right;
            }
        }
        else {
            this.yVelocity = this.speed();
            if ((Math.random() < 0.5 && this.y > 52) || this.y > 6300) {
                this.yVelocity *= -1;
                this.facing = directions.up;
            }
            else {
                this.facing = directions.down;
            }
        }
    }
};

Beast.prototype.think = function() {
    this.xVelocity = 0;
    this.yVelocity = 0;
    if (this.spotted) {
        if (Math.random() < this.moveChance()) {
            this.turnRandomDirection();
        }
    }
    else if (this.distanceFromPlayer() < SPOT_RADIUS) {
        this.spotted = true;
        playSound('large_wolf_howl0');
    }
};

Beast.prototype.echolocationVolume = function() {
    var x = Math.max(SPOT_RADIUS / this.distanceFromPlayer(), MIN_ECHOLOCATION_VOLUME);
    if (x > 0.9) {
        return 1;
    }
    else if (x > 0.8) {
        return 0.9;
    }
    return 1 - 1 / (5 * x + 1);
}

Beast.prototype.echolocate = function() {
    if (this.distanceFromPlayer() > SPOT_RADIUS) {
        if (this.echolocateTimer <= 0) {
            if (!MUTE_ECHOLOCATION) {
                playSound('large_wolf_howl0', this.echolocationVolume());
            }
            this.echolocateTimer = BEAST_ECHOLOCATE_TIMER_FRAMES;
        }
        this.echolocateTimer--;
    }
    else {
        this.echolocateTimer = BEAST_ECHOLOCATE_TIMER_FRAMES;
    }
}

Beast.prototype.update = function() {
    // Handle speed and such.
    if (this.running()) {
        this.runTimer--;
    }
    else if (this.thoughtTimer <= 0) {
        this.think();
        this.thoughtTimer = this.timerFrames();
    }
    else {
        this.thoughtTimer--;
    }
    this.echolocate();
    if (this.flashTimer > 0) {
        this.color = '#f22';
        this.filter = 'contrast(0) sepia() saturate(100)';
        this.flashTimer--;
    }
    else{
        this.color = '#224';
        this.filter = 'brightness(0)';
    }
    handleTileCollision(this);
    handleEntityCollision(this);
    Entity.prototype.update.call(this);
};

Beast.prototype.bloodSpray = function() {
    var particleCount = BLOOD_SPRAY_COUNT + BLOOD_SPRAY_COUNT_VARIANCE * (Math.random() - 0.5);
    for (var i = 0; i < particleCount; i++) {
        var particle = new BloodParticle(this.x + this.width / 2, this.y + this.height / 2);
        entities.unshift(particle);
    }
};

Beast.prototype.handleEntityCollision = function(entity) {
    if (entity.active) {
        var startingHealth = this.health;
        this.health -= entity.damage(this);
        player.triggerAttack();
        if (this.health != startingHealth && !this.dead) {
            if (this.health <= -0.25 * BEAST_HP) {
                playSound('DogWail');
                this.dead = true;
            }
            else {
                playSound('DogYip');
            }
            this.flashTimer = FLASH_TIMER_FRAMES;
            this.runTimer = this.runTimerFrames();
            this.turnRandomDirection();
            this.bloodSpray();
        }
    }
};

Beast.prototype.getMappedFrame = function(frame) {
    switch (frame) {
    case 0:
        return 1;
    case 1:
        return 2;
    case 2:
        return 1;
    case 3:
        return 0;
    }
}

Beast.prototype.draw = function() {
    if (this.moving()) {
        if (this.animationTimer <= 0) {
            this.animationFrame++;
            this.animationFrame %= 4;
            this.animationTimer = BEAST_ANIMATION_FRAMES;
        }
        else {
            this.animationTimer--;
        }
    }
    else {
        this.animationFrame = 0;
        this.animationTimer = BEAST_ANIMATION_FRAMES;
    }
    var image = 'sandy.png';
    var spriteIndex = 0;
    var animationFrame = this.getMappedFrame(this.animationFrame);
    if (this.facing == directions.right) {
        spriteIndex = 1;
    }
    else if (this.facing == directions.down) {
        spriteIndex = 2;
    }
    else if (this.facing == directions.left) {
        spriteIndex = 3;
    }
    drawTiledImage(image, this.x - (BEAST_SIZE / 4), this.y - BEAST_SIZE, false, animationFrame * BEAST_SPRITE_WIDTH, spriteIndex * BEAST_SPRITE_HEIGHT, BEAST_SPRITE_WIDTH, BEAST_SPRITE_HEIGHT, 48, 64, this.filter);
};
