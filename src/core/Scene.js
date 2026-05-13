import * as THREE from "three";

export class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#87CEEB");
    this.scene.fog = new THREE.Fog("#87CEEB", 180, 400);
  }

  get() {
    return this.scene;
  }

  add(obj) {
    this.scene.add(obj);
  }

  remove(obj) {
    this.scene.remove(obj);
  }

  getCenter() {
    const box = new THREE.Box3().setFromObject(this.scene);
    const center = new THREE.Vector3();

    box.getCenter(center);

    return center;
  }
}
