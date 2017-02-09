var keys = {
    left: 37,
    right: 39,
    up: 38,
    down: 40,
    w: 87,
    a: 65,
    s: 83,
    d: 68,
    z: 90,
    space: 32
};

var keyState, triggerKeyState;

function configureInput() {
    keyState = {};
    triggerKeyState = {};
    _.keys(keys).forEach(function(key) {
        keyState[key] = false; 
        triggerKeyState[key] = false; 
    });
}

var keyPressed = function(e) {
    var key = _.findKey(keys, function(x) {
        return x == e.keyCode;
    });
    if (key) {
        if (!keyState[key]) {
            triggerKeyState[key] = true;
        }
        keyState[key] = true;
        e.preventDefault();
    }
    else {
        console.log('Pressed ' + e.keyCode);
    }
};

var keyReleased = function(e) {
    var key = _.findKey(keys, function(x) {
        return x == e.keyCode;
    });
    if (key) {
        keyState[key] = false;
    }
    else {
        console.log('Released ' + e.keyCode);
    }
};

function updateInput() {
    _.keys(keys).forEach(function(key) {
        triggerKeyState[key] = false; 
    });
}
