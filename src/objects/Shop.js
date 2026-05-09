import * as THREE from "three";

export class Shop {
  constructor(data) {
    this.data = data;

    this.height = 10;

    this.createMesh();
  }

  createMesh() {
    const geometry = new THREE.BoxGeometry(
      this.data.width,
      this.height,
      this.data.depth
    );

    const material = new THREE.MeshStandardMaterial({
      color: this.data.color
    });

    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.set(
      this.data.position.x,
      this.height / 2,
      this.data.position.z
    );

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.mesh.userData = {
      id: this.data.id,
      name: this.data.name,
      width: this.data.width,
      depth: this.data.depth
    };
  }

  get() {
    return this.mesh;
  }
}