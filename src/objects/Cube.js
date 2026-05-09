import * as THREE from "three";

export class Cube {
  constructor() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
  }

  get() {
    return this.mesh;
  }

  update() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
}