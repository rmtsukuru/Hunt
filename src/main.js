var FPS = 60, SPEED = 3;

var keys = {
    37: 'left',
    39: 'right',
    38: 'up',
    40: 'down'
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
        if (_.contains(_.keys(keys), e.keyCode.toString())) {
            keyState[keys[e.keyCode]] = true;
        }
        else {
            console.log('Pressed ' + e.keyCode);
        }
    };

    keyReleased = function(e) {
        if (_.contains(_.keys(keys), e.keyCode.toString())) {
            keyState[keys[e.keyCode]] = false;
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

    function drawRect(x, y, width, height, color) {
        graphicsContext.fillStyle = color;
        graphicsContext.fillRect(x, y, width, height);
    }

    function draw() {
        drawRect(0, 0, canvas.width, canvas.height, '#000');
        drawRect(x, y, 30, 30, 'green');
    }

    mainLoop = function() {
        update();
        draw();
    };
    
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    window.setInterval(mainLoop, 1000 / FPS);
};
