var mainLoop;
var player, beast;

window.onload = function() {
    player = new Player(2400, 6000); 
    player.x = 4200;
    player.y = 200;
    beast = new Beast(2200, 3000);
    entities.push(beast);
    entities.push(player);
    configureGraphics(player);
    configureInput();
    configureAudio();
    scene = new TitleScene();

    update = function() {
        entities.forEach(function(entity, i) {
            entity.update();
        });
        updateCamera(player);
        updateInput();
    }

    function drawHud() {
        drawText('X: ' + player.x + ' Y: ' + player.y, 2, 20, 'Cambria', '24px', '#2f2', true);
        drawText('Tile X: ' + tileIndex(player.x) + ' Tile Y: ' + tileIndex(player.y), 2, 48, 'Cambria', '24px', '#f2f', true);
        drawText('Beast HP: ' + beast.health, 2, 76, 'Cambria', '24px', '#2ff', true);
        drawText('Beast Distance: ' + beast.distanceFromPlayer(), 2, 104, 'Cambria', '24px', '#e88', true);
        drawMinimap(true);
    }

    draw = function() {
        drawRect(0, 0, canvasWidth, canvasHeight, '#7898A7', true);
        drawBackgroundTiles();
        entities.forEach(function(entity, i) {
            entity.draw();
        });
        drawForegroundTiles();
        drawRect(0, 0, canvasWidth, canvasHeight, 'rgba(50, 0, 130, 0.8)', true);
        drawRect(player.x - canvasWidth / 2, player.y - canvasHeight, canvasWidth, canvasHeight / 2, 'black');
        drawRect(player.x + canvasWidth / 2, player.y - canvasHeight, canvasWidth / 2, canvasHeight * 2, 'black');
        drawRect(player.x - canvasWidth / 2, player.y + canvasHeight / 2, canvasWidth, canvasHeight / 2, 'black');
        drawRect(player.x - canvasWidth, player.y - canvasHeight, canvasWidth / 2, canvasHeight * 2, 'black');
        drawImage('spotlight.png', player.x - canvasWidth / 2, player.y - canvasHeight / 2);
        if (DEBUG_DISPLAY) {
            drawHud();
        }
    }

    mainLoop = function() {
        scene.update();
        scene.draw();
    };
    
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    window.setInterval(mainLoop, 1000 / FPS);
};
