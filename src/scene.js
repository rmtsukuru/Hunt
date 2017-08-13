const FADE_TIMER_FRAMES = 4 * FPS;
const FADEOUT_TIMER_FRAMES = 4 * FPS;
const UPDATE_THRESHOLD = 0.1;

var scene;

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
    textFadeTimer = TEXT_FADE_TIMER_FRAMES;
}

GameScene.prototype = Object.create(Scene.prototype);

GameScene.prototype.update = function() {
    update();
    if (beast.dead) {
        setTimeout(function() {
            scene = new FadeoutScene();
        }, 1500);
    }
};

function TransitionScene(fadeOut) {
    Scene.call(this);
    this.fadeOut = fadeOut;
    this.fadeTimer = FADE_TIMER_FRAMES;
    playSound('wind1', BGM_VOLUME, true);
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

function FadeoutScene(fadeOut) {
    Scene.call(this);
    this.fadeOut = fadeOut;
    this.fadeTimer = FADEOUT_TIMER_FRAMES;
}

FadeoutScene.prototype = Object.create(Scene.prototype);

FadeoutScene.prototype.update = function() {
    if (this.fadeTimer <= 0) {
        scene = new CreditScene();
    }
    else {
        this.fadeTimer--;
        update();
    }
};

FadeoutScene.prototype.fadeStrength = function() {
    return 1 - (this.fadeTimer / FADE_TIMER_FRAMES);
};

FadeoutScene.prototype.draw = function() {
    Scene.prototype.draw.call(this);
    drawRect(0, 0, canvasWidth, canvasHeight, 'rgba(0, 0, 0, ' + this.fadeStrength() + ')', true);
};

function TitleScene() {
    Scene.call(this);
}

TitleScene.prototype = Object.create(Scene.prototype);

TitleScene.prototype.update = function() {
    if (initialKeyPress) {
        scene = new TransitionScene();
    }
};

TitleScene.prototype.draw = function() {
    drawRect(0, 0, canvasWidth, canvasHeight, '#000', true);
    drawText('HUNT', canvasWidth / 2 - 110, canvasHeight / 2 - 40, 'VT323', '140px', '#ef0000', true);
    drawText('Press any key to begin', canvasWidth / 2 - 105, canvasHeight / 2 + 50, 'VT323', '22px', '#ef0000', true);
}

function CreditScene() {
    Scene.call(this);
    this.fadeTimer = FADE_TIMER_FRAMES;
}

CreditScene.prototype = Object.create(Scene.prototype);

CreditScene.prototype.update = function() {
    if (this.fadeTimer > 0) {
        this.fadeTimer--;
    }
};

CreditScene.prototype.fadeStrength = function() {
    return this.fadeTimer / FADE_TIMER_FRAMES;
};

CreditScene.prototype.draw = function() {
    drawRect(0, 0, canvasWidth, canvasHeight, '#000', true);
    drawText('Created by Sam Randolph @rmtsukuru', 200, 100, 'VT323', '50px', '#bbf', true);
    drawText('Some assets by', 400, 250, 'VT323', '50px', '#bbf', true);
    drawText('adrilahan', 100, 400, 'VT323', '50px', '#bbf', true);
    drawText('Luke.RUSTLTD', 430, 400, 'VT323', '50px', '#bbf', true);
    drawText('Gibmaker', 790, 400, 'VT323', '50px', '#bbf', true);
    drawRect(0, 0, canvasWidth, canvasHeight, 'rgba(0, 0, 0, ' + this.fadeStrength() + ')', true);
}
