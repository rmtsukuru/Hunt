const SNOW_PARTICLE_SIZE = 4;
const SNOW_PARTICLE_SPEED_VARIANCE = 6;
const SNOW_PARTICLE_GRAVITY = 5;
const SNOW_PARTICLE_CAMERA_RATIO = 0.5;
const SNOW_PARTICLE_COUNT = 10;
const SNOW_PARTICLE_COUNT_VARIANCE = 5;

function SnowParticle() {
    Entity.call(this);
    this.color = '#eee';
    this.width = this.height = SNOW_PARTICLE_SIZE;
    this.x = Math.random() * canvasWidth;
    this.y = 0;
    this.xVelocity = SNOW_PARTICLE_SPEED_VARIANCE * 2 * (Math.random() - 0.5);
    this.yVelocity = SNOW_PARTICLE_GRAVITY;
}

SnowParticle.prototype = Object.create(Entity.prototype);

SnowParticle.prototype.update = function() {
    this.yVelocity = SNOW_PARTICLE_GRAVITY - (player.yVelocity * SNOW_PARTICLE_CAMERA_RATIO);
    Entity.prototype.update.call(this);
    if (this.y > canvasHeight) {
        this.remove();
    }
};

SnowParticle.prototype.draw = function() {
    drawRect(this.x, this.y, this.width, this.height, this.color, true);
}

function spawnParticles() {
    var particleCount = SNOW_PARTICLE_COUNT + SNOW_PARTICLE_COUNT_VARIANCE * 2 * (Math.random() - 0.5);
    for (var i = 0; i < particleCount; i++) {
        entities.push(new SnowParticle());
    }
}
