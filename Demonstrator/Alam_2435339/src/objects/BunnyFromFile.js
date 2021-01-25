class BunnyFromFile extends THREE.Group {

    constructor() {
        super();
        this.fbxLoader = new THREE.FBXLoader();
        this.load(this);
    }

    load(thisBunny) {
        this.fbxLoader.load("src/models/Bunny/Bunny.fbx", function (fbx) {

            fbx.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                }
            });

            thisBunny.add(fbx);
        });
    }
}