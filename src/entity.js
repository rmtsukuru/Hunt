function Entity(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.size = TILE_SIZE;
    this.color = '#000';
};

Entity.prototype.update = function() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
}

Entity.prototype.draw = function() {
    drawRect(this.x, this.y, this.size, this.size, this.color);
}

Entity.prototype.handleEntityCollision = function() {
    // Do nothing, this is for inheritance.
}

