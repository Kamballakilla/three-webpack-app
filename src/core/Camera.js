import * as THREE from "three";
import { SCENE_WIDTH } from '../constants/constants.js'

export class Camera {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    this.camera.position.set(SCENE_WIDTH/2, SCENE_WIDTH, SCENE_WIDTH);
  }

  get() {
    return this.camera;
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}
