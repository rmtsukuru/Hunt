var mainLoop;
var player, beast;

var minimapEnabled = false;

window.onload = function() {
    player = new Player(2400, 6000); 
    beast = new Beast(2200, 3000);
    entities.push(beast);
    entities.push(player);
    configureGraphics(player);
    configureInput();
    configureAudio();
    scene = new TitleScene();

    for (var i = 0; i < FPS; i++) {
        update();
    }

    mainLoop = function() {
        scene.update();
        scene.draw();
    };
    
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    window.setInterval(mainLoop, 1000 / FPS);
};
