function setTruckSound(event) {

    truck.sounds.get("Rückwärtsgang").pause();
    if (truck.state.rückwärtsgang) {
        truck.sounds.get("Rückwärtsgang").setVolume(0.5);
        truck.sounds.get("Rückwärtsgang").play();
        truck.sounds.get("Rückwärtsgang").setLoop(true);
    } else {
        truck.sounds.get("Rückwärtsgang").pause();
    }

    //Sound "Hupe"(horn.wav) in executeRaycast.js

}