import * as THREE from "three";

export class Lights {
  constructor() {
    this.group = new THREE.Group();

    this.init();
  }

  init() {
    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      0.6
    );

    const directionalLight = new THREE.DirectionalLight(
      0xffffff,
      1
    );

    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;

    this.group.add(ambientLight);
    this.group.add(directionalLight);
  }

  get() {
    return this.group;
  }
}