function update() {
    if (triggerKeyState.q) {
        minimapEnabled = !minimapEnabled;
    }
    entities.forEach(function(entity, i) {
        entity.update();
    });
    spawnParticles();
    updateCamera(player);
    updateInput();
}

function drawHud() {
    drawText('X: ' + player.x + ' Y: ' + player.y, 2, 20, 'Cambria', '24px', '#2f2', true);
    drawText('Tile X: ' + tileIndex(player.x) + ' Tile Y: ' + tileIndex(player.y), 2, 48, 'Cambria', '24px', '#f2f', true);
    drawText('Beast HP: ' + beast.health, 2, 76, 'Cambria', '24px', '#2ff', true);
    drawText('Beast Distance: ' + beast.distanceFromPlayer(), 2, 104, 'Cambria', '24px', '#e88', true);
    if (minimapEnabled) {
        drawMinimap(true);
    }
}

function draw() {
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
