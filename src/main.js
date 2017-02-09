const FPS = 60;
var mainLoop;
var player, beast;

window.onload = function() {
    player = new Player(350, 300); 
    entities.push(player);
    beast = new Beast(480, 632);
    entities.push(beast);
    configureGraphics();
    configureInput();

    function update() {
        updateInput();
        entities.forEach(function(entity, i) {
            entity.update();
        });
        updateCamera(player);
    }

    function draw() {
        drawRect(0, 0, canvasWidth, canvasHeight, '#98b', true);
        drawBackgroundTiles();
        entities.forEach(function(entity, i) {
            entity.draw();
        });
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
