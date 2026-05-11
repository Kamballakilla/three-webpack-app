import * as THREE from "three";
import { SCENE_WIDTH } from "../constants/constants.js";

export class Camera {
  constructor() {
    this.aspect = window.innerWidth / window.innerHeight;
    this.frustumSize = SCENE_WIDTH;

    // 3D камера
    this.perspective = new THREE.PerspectiveCamera(75, this.aspect, 0.1, 1000);

    this.perspective.position.set(SCENE_WIDTH / 2, SCENE_WIDTH, SCENE_WIDTH);

    // 2D камера
    this.orthographic = this.createOrthoCamera();

    this.active = this.perspective;
  }

  createOrthoCamera() {
    const size = this.frustumSize;

    const camera = new THREE.OrthographicCamera(
      (size * this.aspect) / -2,
      (size * this.aspect) / 2,
      size / 2,
      size / -2,
      0.1,
      1000,
    );

    const centerX = SCENE_WIDTH / 2;
    const centerZ = SCENE_WIDTH / 4;

    camera.position.set(centerX, 100, centerZ);
    camera.lookAt(centerX, 0, centerZ);

    return camera;
  }

  setMode(mode) {
    if (mode === "2d") {
      this.active = this.orthographic;
    } else {
      this.active = this.perspective;
    }
  }

  getMode() {
    return this.active === this.perspective ? "3d" : "2d";
  }

  get() {
    return this.active;
  }

  resize() {
    this.aspect = window.innerWidth / window.innerHeight;

    // perspective
    this.perspective.aspect = this.aspect;
    this.perspective.updateProjectionMatrix();

    // ortho
    const size = this.frustumSize;

    this.orthographic.left = (-size * this.aspect) / 2;
    this.orthographic.right = (size * this.aspect) / 2;
    this.orthographic.top = size / 2;
    this.orthographic.bottom = -size / 2;

    this.orthographic.updateProjectionMatrix();
  }
}
