const BLOOD_PARTICLE_SIZE = 4;
const BLOOD_PARTICLE_SPEED = 2;
const BLOOD_PARTICLE_SPEED_VARIANCE = 5;
const BLOOD_PARTICLE_SPRAY_FRAMES = 0.07 * FPS;

function BloodParticle(x, y) {
    // TODO maybe randomize position
    Entity.call(this, x, y);
    this.color = '#f00';
    this.width = this.height = BLOOD_PARTICLE_SIZE;
    this.sprayTimer = BLOOD_PARTICLE_SPRAY_FRAMES;
    this.xVelocity = BLOOD_PARTICLE_SPEED + BLOOD_PARTICLE_SPEED_VARIANCE * (Math.random() - 0.5);
    if (Math.random() < 0.5) {
        this.xVelocity *= -1;
    }
    this.yVelocity = BLOOD_PARTICLE_SPEED;
    this.yVelocity = BLOOD_PARTICLE_SPEED + BLOOD_PARTICLE_SPEED_VARIANCE * (Math.random() - 0.5);
    if (Math.random() < 0.5) {
        this.yVelocity *= -1;
    }
}

BloodParticle.prototype = Object.create(Entity.prototype);

BloodParticle.prototype.update = function() {
    if (this.sprayTimer <= 0) {
        this.xVelocity = 0;
        this.yVelocity = 0;
    }
    else {
        this.sprayTimer--;
    }
    Entity.prototype.update.call(this);
};

BloodParticle.prototype.draw = function() {
    Entity.prototype.draw.call(this);
};
