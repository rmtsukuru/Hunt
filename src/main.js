var mainLoop;
var player, beast;

window.onload = function() {
    player = new Player(2400, 6000); 
    beast = new Beast(2200, 3000);
    entities.push(beast);
    entities.push(player);
    configureGraphics(player);
    configureInput();
    configureAudio();
    scene = new TransitionScene();

    update = function() {
        entities.forEach(function(entity, i) {
            entity.update();
        });
        updateCamera(player);
        updateInput();
    }

    function drawHud() {
        drawText('X: ' + player.x + ' Y: ' + player.y, 2, 20, 'Cambria', '24px', '#2f2', true);
        drawText('Beast HP: ' + beast.health, 2, 48, 'Cambria', '24px', '#2ff', true);
        drawText('Beast Distance: ' + beast.distanceFromPlayer(), 2, 76, 'Cambria', '24px', '#e88', true);
    }

    draw = function() {
        drawRect(0, 0, canvasWidth, canvasHeight, '#7898A7', true);
        drawBackgroundTiles();
        entities.forEach(function(entity, i) {
            entity.draw();
        });
        drawForegroundTiles();
        drawRect(0, 0, canvasWidth, canvasHeight, 'rgba(50, 0, 130, 0.5)', true);
        drawImage('spotlight.png', 0, 0, true);
        drawHud();
    }

    mainLoop = function() {
        scene.update();
        scene.draw();
    };
    
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    window.setInterval(mainLoop, 1000 / FPS);
};
