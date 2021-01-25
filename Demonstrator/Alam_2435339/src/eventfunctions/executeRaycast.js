raycaster = new THREE.Raycaster();

function executeRaycast(event) {

    raycaster.setFromCamera(mousePosition, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        var firstHit = intersects[0].object;

        if (firstHit.name == "Windschutzscheibe") {
            firstHit.userData.forward = !firstHit.userData.forward;
            if (firstHit.userData.forward) {
                firstHit.userData.backwardTruckTranslation.stop();
                firstHit.userData.backwardReifenRotation1.stop();
                firstHit.userData.backwardReifenRotation2.stop();
                firstHit.userData.backwardReifenRotation3.stop();
                firstHit.userData.backwardReifenRotation4.stop();

                firstHit.userData.forwardTruckTranslation.start();
                firstHit.userData.forwardReifenRotation1.start();
                firstHit.userData.forwardReifenRotation2.start();
                firstHit.userData.forwardReifenRotation3.start();
                firstHit.userData.forwardReifenRotation4.start();

                truck.state.rückwärtsgang = false;
                window.dispatchEvent(new Event("truckStateChanged"));

            } else {
                firstHit.userData.forwardTruckTranslation.stop();
                firstHit.userData.forwardReifenRotation1.stop();
                firstHit.userData.forwardReifenRotation2.stop();
                firstHit.userData.forwardReifenRotation3.stop();
                firstHit.userData.forwardReifenRotation4.stop();

                firstHit.userData.backwardTruckTranslation.start();
                firstHit.userData.backwardReifenRotation1.start();
                firstHit.userData.backwardReifenRotation2.start();
                firstHit.userData.backwardReifenRotation3.start();
                firstHit.userData.backwardReifenRotation4.start();

                truck.state.rückwärtsgang = true;
                window.dispatchEvent(new Event("truckStateChanged"));
            }

        }

        else if (firstHit.name == "linkes Fenster") {
            truck.sounds.get("Hupe").setVolume(0.5);
            truck.sounds.get("Hupe").play();
        }

    }
}