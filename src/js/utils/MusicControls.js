function play(musicRef) {
    musicRef.current.play();
}

function pause(musicRef) {
    musicRef.current.pause();
}

function seekBackward(musicRef) {
    musicRef.current.currentTime -= 5;
}

function seekForward(musicRef) {
    musicRef.current.currentTime += 5;
}

function updateVolume(musicRef, volume) {
    musicRef.current.volume = volume / 100;
}

export { play, pause, seekBackward, seekForward, updateVolume };
