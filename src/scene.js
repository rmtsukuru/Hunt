const FADE_TIMER_FRAMES = 4 * FPS;
const UPDATE_THRESHOLD = 0.1;

var scene;
var draw, update;

function Scene() {
}

Scene.prototype.update = function() {
    // Do nothing, this is for inheritance.
};

Scene.prototype.draw = function() {
    draw();
}

function GameScene() {
    Scene.call(this);
}

GameScene.prototype = Object.create(Scene.prototype);

GameScene.prototype.update = function() {
    update();
};

function TransitionScene(fadeOut) {
    Scene.call(this);
    this.fadeOut = fadeOut;
    this.fadeTimer = FADE_TIMER_FRAMES;
    playSound('wind_blowing_sound', null, true);
}

TransitionScene.prototype = Object.create(Scene.prototype);

TransitionScene.prototype.update = function() {
    if (this.fadeTimer <= 0) {
        scene = new GameScene();
    }
    else {
        this.fadeTimer--;
        if (this.fadeTimer < (1 - UPDATE_THRESHOLD) * FADE_TIMER_FRAMES) {
            update();
        }
    }
};

TransitionScene.prototype.fadeStrength = function() {
    return this.fadeTimer / FADE_TIMER_FRAMES;
};

TransitionScene.prototype.draw = function() {
    Scene.prototype.draw.call(this);
    drawRect(0, 0, canvasWidth, canvasHeight, 'rgba(0, 0, 0, ' + this.fadeStrength() + ')', true);
};
