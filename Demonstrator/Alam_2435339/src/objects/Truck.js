class Truck extends THREE.Group {
    tweens;

    constructor() {
        super();

        this.addParts();
        this.sounds = new Map();
        this.state = {
            rückwärtsgang: false
        };
    }

    addParts() {

        const SCALE = 5; //fahrerhaus
        const SCALE2 = 2.5; //fenster

        var truck = new THREE.Group();

    //Fahrerhaus (Modellierung in Blender; gerundete Koordinaten übernommen)
        var fahrerhausGroup = new THREE.Group();
        fahrerhausGroup.position.set(20.5,5,0);

        var fahrerhausShape = new THREE.Shape();
        fahrerhausShape.moveTo(-2.15 * SCALE,2.65 * SCALE);
        fahrerhausShape.lineTo(-0.95 * SCALE,2.65 * SCALE);
        fahrerhausShape.lineTo(0.9 * SCALE,1.45 * SCALE);
        fahrerhausShape.lineTo(1.9 * SCALE ,1.15 * SCALE);
        fahrerhausShape.lineTo(2.15 * SCALE ,0.95 * SCALE);
        fahrerhausShape.lineTo(2.25 * SCALE ,0.6 * SCALE);
        fahrerhausShape.lineTo(2.3 * SCALE,-1 * SCALE);
        fahrerhausShape.lineTo(-2.15 * SCALE,-1 * SCALE);
        fahrerhausShape.lineTo(-2.15 * SCALE,2.65 * SCALE);
        var extrudeSettings = {
            steps: 1,
            depth: 20,
            bevelEnabled: false
        };
        var fahrerhausGeometry = new THREE.ExtrudeGeometry(fahrerhausShape, extrudeSettings);
        var fahrerhausMaterial = new THREE.MeshLambertMaterial({
            color: 0xD5E3EC
        });
        var fahrerhaus = new THREE.Mesh(fahrerhausGeometry, fahrerhausMaterial);
        fahrerhaus.position.z = -10;
        fahrerhaus.castShadow = true;
        fahrerhausGroup.add(fahrerhaus);


    //Kühlergrill
        var kühlergrillGeometry = new THREE.BoxGeometry(8, 3, 0.5);
        var kühlergrillMaterial = new THREE.MeshStandardMaterial({
            color: 0xD3D3D3,
            metalness: 0.5
        });

        var bumpMaterial = new THREE.MeshPhongMaterial({
            color: kühlergrillMaterial.color
        });
        bumpMaterial.bumpMap = new THREE.TextureLoader().load("src/images/bump.png");
        var materialArray = [
            kühlergrillMaterial,
            kühlergrillMaterial,
            kühlergrillMaterial,
            kühlergrillMaterial,
            kühlergrillMaterial,
            bumpMaterial
        ];

        var kühlerGrill = new THREE.Mesh(kühlergrillGeometry, materialArray);
        kühlerGrill.position.set(32, 4, 0);
        kühlerGrill.rotation.y = -90 * DEG_TO_RAD;
        kühlerGrill.castShadow = true;
        truck.add(kühlerGrill);



    //Autoglas
        var windschutzscheibeGeometry = new THREE.BoxGeometry(0.1, 8, 18);
        var windschutzscheibeMaterial = new THREE.MeshLambertMaterial({
            color: 0x444444
        });
        var windschutzscheibe = new THREE.Mesh(windschutzscheibeGeometry, windschutzscheibeMaterial);
        windschutzscheibe.position.x = 0.5;
        windschutzscheibe.position.y = 10;
        windschutzscheibe.rotation.z = 57 * DEG_TO_RAD;
        windschutzscheibe.castShadow = true;
        windschutzscheibe.name = "Windschutzscheibe";
        fahrerhausGroup.add(windschutzscheibe);


        var fenster = new THREE.Group();
        fenster.position.x = -2.5;
        fenster.position.y = 5;

        var fensterShape = new THREE.Shape();
        fensterShape.moveTo(-2.15 * SCALE2,2.65 * SCALE2);
        fensterShape.lineTo(-0.95 * SCALE2,2.65 * SCALE2);
        fensterShape.lineTo(0.9 * SCALE2,1.45 * SCALE2);
        fensterShape.lineTo(0.9 * SCALE2,0 * SCALE2);
        fensterShape.lineTo(-2.15 * SCALE2,0 * SCALE2);
        fensterShape.lineTo(-2.15 * SCALE2,2.65 * SCALE2);

        var extrudeSettings2 = {
            steps: 1,
            depth: 0.5,
            bevelEnabled: false
        };
        var fensterGeometry = new THREE.ExtrudeGeometry(fensterShape, extrudeSettings2);
        var fensterMaterial = new THREE.MeshLambertMaterial({
            color: 0x444444
        });
        var fenster1 = new THREE.Mesh(fensterGeometry, fensterMaterial);
        fenster1.position.z = -10.1;
        fenster1.name = "linkes Fenster"
        fenster1.castShadow = true;
        fenster.add(fenster1);

        var fenster2 = new THREE.Mesh(fensterGeometry, fensterMaterial);
        fenster2.position.z = 9.6;
        fenster2.castShadow = true;
        fenster.add(fenster2);

        fahrerhausGroup.add(fenster);
        truck.add(fahrerhausGroup);


        //Leuchten
        var frontlampen = new THREE.Group();
        frontlampen.position.set(32, 4, 0);
        var frontlampeGeometry = new THREE.BoxGeometry(0.5, 2.5, 4);
        var frontlampeMaterial = new THREE.MeshLambertMaterial({
            color: 0xFFFFB5,
            transparent: true,
            opacity: 0.5
        });

        var lichtGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32, 1, false);
        var lichtMaterial = new THREE.MeshLambertMaterial({
            color: 0xFFFFFF
        });


        var frontlampe1 = new THREE.Mesh(frontlampeGeometry, frontlampeMaterial);
        frontlampe1.position.z = 7;
        frontlampe1.castShadow = true;
        var licht1 = new THREE.Mesh(lichtGeometry, lichtMaterial);
        licht1.rotation.z = -90 * DEG_TO_RAD;
        frontlampe1.add(licht1);

        var frontlampe2 = new THREE.Mesh(frontlampeGeometry, frontlampeMaterial);
        frontlampe2.position.z = -7;
        frontlampe2.castShadow = true;
        var licht2 = new THREE.Mesh(lichtGeometry, lichtMaterial);
        licht2.rotation.z = -90 * DEG_TO_RAD;
        frontlampe2.add(licht2);

        frontlampen.add(frontlampe1, frontlampe2)


        var reflektoren = new THREE.Group();
        reflektoren.position.set(-21.5, 5, 0);
        var reflektorGeometry = new THREE.BoxGeometry(0.5, 1.5, 4);
        var reflektorMaterial = new THREE.MeshLambertMaterial({
            color: 0xBA0000,
            emissive: 0xBA0000,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.8
        });

        var reflektor1 = new THREE.Mesh(reflektorGeometry, reflektorMaterial);
        reflektor1.position.z = 8;
        reflektor1.castShadow = true;
        var reflektor2 = new THREE.Mesh(reflektorGeometry, reflektorMaterial);
        reflektor2.position.z = -8;
        reflektor2.castShadow = true;
        reflektoren.add(reflektor1, reflektor2);

        truck.add(frontlampen, reflektoren);


    //Anhänger
        var anhängerGeometry = new THREE.BoxGeometry(30, 20, 25);
        var anhängerMaterial = new THREE.MeshLambertMaterial({
            color: 0xECD5E3
        });
        var anhänger = new THREE.Mesh(anhängerGeometry, anhängerMaterial);
        anhänger.position.set(-5.25, 16, 0);
        anhänger.castShadow = true;


        var texturPlaneGeometry = new THREE.PlaneGeometry(24,12);
        var texturPlaneMaterial = new THREE.MeshLambertMaterial({
            color: 0xFFFFFF,
            transparent: true
        });
        texturPlaneMaterial.map = new THREE.TextureLoader().load('src/images/WebGL_Logo.png');
        texturPlaneMaterial.map.anisotropy = 8;

        var texturPlaneMesh1 = new THREE.Mesh(texturPlaneGeometry, texturPlaneMaterial);
        texturPlaneMesh1.position.set(anhänger.position.x, anhänger.position.y,
            anhänger.position.z + anhängerGeometry.parameters.depth/2 + 0.05);
        texturPlaneMesh1.castShadow = true;
        var texturPlaneMesh2 = new THREE.Mesh(texturPlaneGeometry, texturPlaneMaterial);
        texturPlaneMesh2.position.set(anhänger.position.x, anhänger.position.y,
            anhänger.position.z - anhängerGeometry.parameters.depth/2 - 0.05);
        texturPlaneMesh2.rotation.y = 180 * DEG_TO_RAD;
        texturPlaneMesh2.castShadow = true;

        truck.add(texturPlaneMesh1, texturPlaneMesh2);


    //Fläche unter Anhänger
        var gerüstGeometry = new THREE.BoxGeometry(31, 2, 25);
        var gerüstMaterial = new THREE.MeshLambertMaterial({
           color: 0x000000
        });
        var gerüst = new THREE.Mesh(gerüstGeometry, gerüstMaterial);
        gerüst.position.x = -0.5;
        gerüst.position.y = -11;
        gerüst.castShadow = true;

        anhänger.add(gerüst);
        truck.add(anhänger);


    //Reifen und Felgen
        var reifen = new THREE.Group();

        var reifenGeometry = new THREE.CylinderGeometry(5,5,2.5,16,1,false);
        var reifenMaterial = new THREE.MeshLambertMaterial({
            color: 0x333333
        });

        var felgeGeometry = new THREE.CylinderGeometry(2.5,2.5,1.25,16,1,false);
        var felgeMaterial = new THREE.MeshLambertMaterial({
            color: 0x888888
        });


        var reifen1 = new THREE.Mesh(reifenGeometry, reifenMaterial);
        reifen1.rotation.x = -90 * DEG_TO_RAD;
        reifen1.position.x = 20;
        reifen1.position.z = -10;
        reifen1.castShadow = true;

        var felge1 = new THREE.Mesh(felgeGeometry, felgeMaterial);
        felge1.position.y = 0.75;
        reifen1.add(felge1);

        var reifen2 = new THREE.Mesh(reifenGeometry, reifenMaterial);
        reifen2.rotation.x = -90 * DEG_TO_RAD;
        reifen2.position.x = 20;
        reifen2.position.z = 10;
        reifen2.castShadow = true;

        var felge2 = new THREE.Mesh(felgeGeometry, felgeMaterial);
        felge2.position.y = -0.75;
        felge2.rotation.x = 180 * DEG_TO_RAD;
        reifen2.add(felge2);

        var reifen3 = new THREE.Mesh(reifenGeometry, reifenMaterial);
        reifen3.rotation.x = -90 * DEG_TO_RAD;
        reifen3.position.x = -10;
        reifen3.position.z = -10;
        reifen3.castShadow = true;

        var felge3 = new THREE.Mesh(felgeGeometry, felgeMaterial);
        felge3.position.y = 0.75;
        reifen3.add(felge3);

        var reifen4 = new THREE.Mesh(reifenGeometry, reifenMaterial);
        reifen4.rotation.x = -90 * DEG_TO_RAD;
        reifen4.position.x = -10;
        reifen4.position.z = 10;
        reifen4.castShadow = true;

        var felge4 = new THREE.Mesh(felgeGeometry, felgeMaterial);
        felge4.position.y = -0.75;
        felge4.rotation.x = 180 * DEG_TO_RAD;
        reifen4.add(felge4);

        reifen.add(reifen1, reifen2, reifen3, reifen4);
        truck.add(reifen);

    //FBX BunnyFromFile
        //Instanziierung in Truck.js, damit er bei Animation mitfährt
        var bunny = new BunnyFromFile();
        bunny.scale.set(2, 2, 2);
        bunny.position.x = 15;
        bunny.position.y = 20.1;
        bunny.rotation.y = 90 * DEG_TO_RAD;
        bunny.castShadow = true;
        truck.add(bunny);


    //Animationen
        var duration = 3000;
        var translate = 150;
        var rotate = 1000;

        this.tweens = {
            forward: false,

            forwardTruckTranslation: new TWEEN.Tween(truck.position).to(new THREE.Vector3(truck.position.x + translate,
                truck.position.y, truck.position.z), duration).easing(TWEEN.Easing.Quadratic.InOut),
            forwardReifenRotation1: new TWEEN.Tween(reifen1.rotation).to(new THREE.Vector3(reifen1.rotation.x,
                reifen1.rotation.y + rotate, reifen1.rotation.z), duration).easing(TWEEN.Easing.Quadratic.InOut),
            forwardReifenRotation2: new TWEEN.Tween(reifen2.rotation).to(new THREE.Vector3(reifen2.rotation.x,
                reifen2.rotation.y + rotate, reifen2.rotation.z), duration).easing(TWEEN.Easing.Quadratic.InOut),
            forwardReifenRotation3: new TWEEN.Tween(reifen3.rotation).to(new THREE.Vector3(reifen3.rotation.x,
                reifen3.rotation.y + rotate, reifen3.rotation.z), duration).easing(TWEEN.Easing.Quadratic.InOut),
            forwardReifenRotation4: new TWEEN.Tween(reifen4.rotation).to(new THREE.Vector3(reifen4.rotation.x,
                reifen4.rotation.y + rotate, reifen4.rotation.z), duration).easing(TWEEN.Easing.Quadratic.InOut),


            backwardTruckTranslation: new TWEEN.Tween(truck.position).to(new THREE.Vector3(truck.position.x,
                truck.position.y, truck.position.z), duration).easing(TWEEN.Easing.Quadratic.InOut),
            backwardReifenRotation1: new TWEEN.Tween(reifen1.rotation).to(new THREE.Vector3(reifen1.rotation.x,
                reifen1.rotation.y, reifen1.rotation.z), duration).easing(TWEEN.Easing.Quadratic.InOut),
            backwardReifenRotation2: new TWEEN.Tween(reifen2.rotation).to(new THREE.Vector3(reifen2.rotation.x,
                reifen2.rotation.y, reifen2.rotation.z), duration).easing(TWEEN.Easing.Quadratic.InOut),
            backwardReifenRotation3: new TWEEN.Tween(reifen3.rotation).to(new THREE.Vector3(reifen3.rotation.x,
                reifen3.rotation.y, reifen3.rotation.z), duration).easing(TWEEN.Easing.Quadratic.InOut),
            backwardReifenRotation4: new TWEEN.Tween(reifen4.rotation).to(new THREE.Vector3(reifen4.rotation.x,
                reifen4.rotation.y, reifen4.rotation.z), duration).easing(TWEEN.Easing.Quadratic.InOut),
        };
        windschutzscheibe.userData = this.tweens;

        this.add(truck);
    }

    //Sounds
    loadSounds(soundscape) {
        var hupe = soundscape.createSound("src/sound/files/horn.wav", 50, false);
        this.sounds.set("Hupe", hupe);
        this.add(hupe);

        var rückwärtsgang = soundscape.createSound("src/sound/files/beep.mp3", 50, false);
        this.sounds.set("Rückwärtsgang", rückwärtsgang);
        this.add(rückwärtsgang);
    }
}