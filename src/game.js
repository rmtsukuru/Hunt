const TEXT_FADE_TIMER_FRAMES = 3 * FPS;
const SLAY_MESSAGE_TIMER_FRAMES = 5 * FPS;

var movementMessageDisplayed, slayMessageDisplayed, attackMessageDisplayed;
var textFadeTimer, textFadeOutTimer = -1;
var slayMessageTimer = -1;

function configureGame() {
    movementMessageDisplayed = slayMessageDisplayed = attackMessageDisplayed = false;
}

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
    if (textFadeTimer > 0) {
        textFadeTimer--;
    }
    else if (textFadeOutTimer > 0) {
        textFadeOutTimer--;
    }
    else if (!slayMessageDisplayed && slayMessageTimer > 0) {
        slayMessageTimer--;
    }
    else if (!movementMessageDisplayed && player.movementTimer == 0 && textFadeOutTimer < 0) {
        textFadeOutTimer = TEXT_FADE_TIMER_FRAMES;
    }
    else if (!slayMessageDisplayed && slayMessageTimer == 0 && textFadeOutTimer < 0) {
        textFadeOutTimer = TEXT_FADE_TIMER_FRAMES;
        slayMessageTimer = -1;
    }
    else if (!slayMessageDisplayed && slayMessageTimer == 0 && textFadeTimer < 0) {
        textFadeOutTimer = -1;
        textFadeTimer = TEXT_FADE_TIMER_FRAMES;
    }
    else if (!slayMessageDisplayed && slayMessageTimer == 0 && textFadeTimer == 0) {
        slayMessageTimer = SLAY_MESSAGE_TIMER_FRAMES;
        textFadeTimer = -1;
    }
    else if (!attackMessageDisplayed && beast.spotted && textFadeTimer < 0) {
        textFadeTimer = TEXT_FADE_TIMER_FRAMES;
        textFadeOutTimer = -1
    }
    else if (!attackMessageDisplayed && player.attackTimer == 0 && textFadeOutTimer < 0) {
        textFadeOutTimer = TEXT_FADE_TIMER_FRAMES;
        slayMessageTimer = -1;
    }
    else if (textFadeOutTimer == 0 && slayMessageTimer <= 0) {
        textFadeTimer = -1;
        if (slayMessageDisplayed) {
            attackMessageDisplayed = true;
        }
        else if (movementMessageDisplayed) {
            slayMessageDisplayed = true;
            slayMessageTimer = 1
        }
        else {
            movementMessageDisplayed = true;
            slayMessageTimer = SLAY_MESSAGE_TIMER_FRAMES;
        }
    }
}

function textFadeStrength() {
    if (textFadeOutTimer >= 0) {
        return textFadeOutTimer / TEXT_FADE_TIMER_FRAMES;
    }
    return 1 - (textFadeTimer / TEXT_FADE_TIMER_FRAMES);
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
    if (textFadeStrength() > 0) {
        if (slayMessageDisplayed && !attackMessageDisplayed) {
            drawText('Press Z to strike', 200, 180, 'VT323', '30px', 'rgba(222, 222, 255, ' + textFadeStrength() + ')', true);
        }
        else if (movementMessageDisplayed && !slayMessageDisplayed) {
            drawText('Slay the Beast', 430, 280, 'VT323', '30px', 'rgba(222, 222, 255, ' + textFadeStrength() + ')', true);
        }
        else {
            drawText('Use arrow keys to move', 600, 180, 'VT323', '30px', 'rgba(222, 222, 255, ' + textFadeStrength() + ')', true);
        }
    }
    if (DEBUG_DISPLAY) {
        drawHud();
    }
}
