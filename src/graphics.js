var cameraX = 0;
var cameraY = 0;

var canvas, graphicsContext;
var canvasWidth, canvasHeight;

var mapWidth = tiles[0].length * TILE_SIZE;
var mapHeight = tiles.length * TILE_SIZE;


function configureGraphics() {
    canvas = document.getElementById('gameCanvas');
    graphicsContext = canvas.getContext('2d');
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
}

function drawRect(x, y, width, height, color, ignoreCamera) {
    graphicsContext.fillStyle = color;
    if (ignoreCamera) {
        graphicsContext.fillRect(x, y, width, height);
    }
    else {
        graphicsContext.fillRect(x - cameraX, y - cameraY, width, height);
    }
}

function updateCamera(target) {
    cameraX = target.x - canvasWidth / 2;
    cameraY = target.y - canvasHeight / 2;

    if (cameraX < 0) {
        cameraX = 0;
    }
    else if (cameraX + canvasWidth > mapWidth) {
        cameraX = mapWidth - canvasWidth;
    }

    if (cameraY < 0) {
        cameraY = 0;
    }
    else if (cameraY + canvasHeight > mapHeight) {
        cameraY = mapHeight - canvasHeight;
    }
}
