class Road extends THREE.Mesh {

    constructor(dimX, dimY, segments) {
        super();

        var roadGeometry = new THREE.PlaneGeometry(dimX, dimY);
        var roadMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            side: THREE.DoubleSide
        });

        var roadTexture = new THREE.TextureLoader().load("src/images/road.png");

        roadTexture.repeat.set(segments, segments);
        roadTexture.wrapS = THREE.RepeatWrapping;
        roadTexture.wrapT = THREE.RepeatWrapping;
        roadTexture.anisotropy = 4;

        roadMaterial.map = roadTexture;

        this.geometry = roadGeometry;

        this.material = roadMaterial;

        this.position.y = -5;

        this.rotation.x = -90 * DEG_TO_RAD;

        this.receiveShadow = true;
    }
}