class ConeFromFile extends THREE.Group {

    constructor() {
        super();
        this.fbxLoader = new THREE.FBXLoader();
        this.load(this);
    }

    load(thisCone) {
        this.fbxLoader.load("src/models/Cone/Cone.fbx", function (fbx) {

            fbx.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                }
            });

            thisCone.add(fbx);
        });
    }
}