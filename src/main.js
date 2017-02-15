const FPS = 60;
var mainLoop;
var player, beast;

window.onload = function() {
    player = new Player(2400, 6000); 
    entities.push(player);
    beast = new Beast(2200, 3000);
    entities.push(beast);
    configureGraphics();
    configureInput();

    function update() {
        entities.forEach(function(entity, i) {
            entity.update();
        });
        updateCamera(player);
        updateInput();
    }

    function drawHud() {
        drawText('X: ' + player.x + ' Y: ' + player.y, 2, 20, 'Cambria', '24px', '#2f2', true);
        drawText('Beast HP: ' + beast.health, 2, 48, 'Cambria', '24px', '#2ff', true);
    }

    function draw() {
        drawRect(0, 0, canvasWidth, canvasHeight, '#7898A7', true);
        drawBackgroundTiles();
        entities.forEach(function(entity, i) {
            entity.draw();
        });
        drawForegroundTiles();
        drawHud();
    }

    mainLoop = function() {
        update();
        draw();
    };
    
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    window.setInterval(mainLoop, 1000 / FPS);
};
