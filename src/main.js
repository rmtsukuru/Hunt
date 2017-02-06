const FPS = 60; 

var keys = {
    left: 37,
    right: 39,
    up: 38,
    down: 40
};

var canvas, graphicsContext;
var mainLoop;
var keyState;

var player;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    graphicsContext = canvas.getContext('2d');
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    player = new Player(350, 300); 
    configureInput();

    function update() {
        player.update();
        updateCamera(player);
    }

    function draw() {
        drawRect(0, 0, canvasWidth, canvasHeight, '#98b', true);
        drawBackgroundTiles();
        player.draw();
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
