var FPS = 60, SPEED = 3;

var keys = {
    left: 37,
    right: 39,
    up: 38,
    down: 40
};

var canvas, graphicsContext;
var mainLoop, keyPressed, keyReleased;

var x, y, keyState;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    graphicsContext = canvas.getContext('2d');
    x = 300;
    y = 200;
    keyState = {};
    _.each(_.values(keys), function(key) { 
        keyState[key] = false; 
    });

    keyPressed = function(e) {
        var key = _.findKey(keys, function(x) {
            return x == e.keyCode;
        });
        if (key) {
            keyState[key] = true;
        }
        else {
            console.log('Pressed ' + e.keyCode);
        }
    };

    keyReleased = function(e) {
        var key = _.findKey(keys, function(x) {
            return x == e.keyCode;
        });
        if (key) {
            keyState[key] = false;
        }
        else {
            console.log('Released ' + e.keyCode);
        }
    };

    function update() {
        if (keyState.left) {
            x -= SPEED;
        }
        if (keyState.right) {
            x += SPEED;
        }
        if (keyState.up) {
            y -= SPEED;
        }
        if (keyState.down) {
            y += SPEED;
        }
    }

    function draw() {
        drawRect(0, 0, canvas.width, canvas.height, '#98b');
        drawBackgroundTiles();
        drawRect(x, y, 32, 32, '#a22');
        drawForegroundTiles();
    }

    mainLoop = function() {
        update();
        draw();
    };
    
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    window.setInterval(mainLoop, 1000 / FPS);
};
