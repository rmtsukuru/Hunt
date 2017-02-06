const FPS = 60;
var mainLoop;
var player;

window.onload = function() {
    player = new Player(350, 300); 
    configureGraphics();
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
