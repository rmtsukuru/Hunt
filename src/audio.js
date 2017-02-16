var audioFormat;

function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType('audio/mp3')) {
        audioFormat = '.mp3';
    }
    else {
        audioFormat = '.ogg';
    }
}

function configureAudio() {
    setFormat();
}

function playSound(filename) {
    var sound = new Audio('audio/' + filename + audioFormat);
    sound.play();
}
