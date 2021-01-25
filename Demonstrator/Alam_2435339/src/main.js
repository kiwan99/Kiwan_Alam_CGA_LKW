// External libraries
document.write('<script type="text/javascript" src="../../lib/three.js-r121/build/three.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r121/examples/js/controls/OrbitControls.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r121/examples/js/libs/inflate.min.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r121/examples/js/loaders/FBXLoader.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r121/examples/js/libs/stats.min.js"></script>');
document.write('<script type="text/javascript" src="../../lib/dat.gui-0.7.7/build/dat.gui.js"></script>');
document.write('<script type="text/javascript" src="../../lib/ThreeCSG-1/three-csg.js"></script>');

// Own modules
document.write('<script type="text/javascript" src="src/objects/Lights.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Truck.js"></script>');
document.write('<script type="text/javascript" src="src/objects/ConeFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/BunnyFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Road.js"></script>');
document.write('<script type="text/javascript" src="src/animation/Tween.js"></script>');
document.write('<script type="text/javascript" src="src/sound/Soundscape.js"></script>');

// Event functions
document.write('<script type="text/javascript" src="src/eventfunctions/updateAspectRatio.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/calculateMousePosition.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeRaycast.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/setTruckSound.js"></script>');

const DEG_TO_RAD = Math.PI / 180;

function main() {

    scene = new THREE.Scene();

    //var axes = new THREE.AxesHelper(20);
    //scene.add(axes);

    truck = new Truck();
    scene.add(truck);

    var cones = new THREE.Group();
    cones.position.set(185, -4.25, 0);
    cones.scale.set(0.05, 0.05, 0.05);
    var cone1 = new ConeFromFile();
    cone1.position.z = 100;
    var cone2 = new ConeFromFile();
    cone2.position.z = -100;
    cones.add(cone1, cone2);
    scene.add(cones);

    scene.add(new Road(2000, 2000, 16));

    var lights = new Lights();
    scene.add(lights.createAmbientLight(0.4));
    var directionalLight = lights.createDirectionalLight(-100, 50, -50, 0.5);
    scene.add(directionalLight);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2500);
    camera.position.set(270, 130, -190);
    camera.lookAt(0, 0, 0);

    var gui = new dat.GUI();
    gui.add(directionalLight.position, "x", -250, 250);
    gui.add(directionalLight.position, "y", 0, 150);
    gui.add(directionalLight.position, "z", -250, 250);

    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xE3ECD5));
    renderer.shadowMap.enabled = true;

    document.getElementById("3d_content").appendChild(renderer.domElement);

    var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.target = new THREE.Vector3(0, 0, 0);
    orbitControls.maxPolarAngle = Math.PI / 2; //Kamera geht nicht unter Road
    orbitControls.update();

    var soundscape = new Soundscape();
    truck.loadSounds(soundscape);
    truck.tweens.backwardTruckTranslation.onComplete(function () {
        truck.state.rückwärtsgang = false
        window.dispatchEvent(new Event("truckStateChanged"));
    });
    camera.add(soundscape.getAudioListener());


    function mainLoop() {

        stats.begin();

        TWEEN.update();

        renderer.render(scene, camera);

        stats.end();
        requestAnimationFrame(mainLoop);
    }

    mainLoop();

    window.onresize = updateAspectRatio;
    window.onmousemove = calculateMousePosition;
    window.onclick = executeRaycast;

    window.addEventListener("truckStateChanged", setTruckSound);
    window.dispatchEvent(new Event("truckStateChanged"));
}

document.getElementById("startButton").addEventListener("click", function (event) {
    main();
    document.getElementById("overlay").remove();
});
