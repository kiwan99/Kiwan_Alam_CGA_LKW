class Lights {

    constructor() {

    }

    createAmbientLight(intensity) {
        var ambientLight = new THREE.AmbientLight(0xffffff);
        ambientLight.intensity = intensity;
        return ambientLight;
    }

    createSpotLight(posX, posY, posZ, intensity) {
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(posX, posY, posZ);
        spotLight.intensity = intensity;
        spotLight.target = scene;
        spotLight.angle = 60 * DEG_TO_RAD;
        spotLight.penumbra = 1;
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.aspect = 1;
        spotLight.shadow.camera.near = 10;
        spotLight.shadow.camera.far = 100;
        scene.add(new THREE.CameraHelper(spotLight.shadow.camera));
        return spotLight;
    }

    createDirectionalLight(posX, posY, posZ, intensity) {
        var directionaLight = new THREE.DirectionalLight(0xffffff);
        directionaLight.position.set(posX, posY, posZ);
        directionaLight.lookAt(scene.position);
        directionaLight.intensity = intensity;
        directionaLight.castShadow = true;
        directionaLight.shadow.radius = 2;
        directionaLight.shadow.mapSize.width = 2048;
        directionaLight.shadow.mapSize.height = 2048;

        var x = 150;
        directionaLight.shadow.camera.top = x;
        directionaLight.shadow.camera.bottom = -x;
        directionaLight.shadow.camera.left = -x;
        directionaLight.shadow.camera.right = x;
        //scene.add(new THREE.CameraHelper(directionaLight.shadow.camera));
        return directionaLight;
    }
}