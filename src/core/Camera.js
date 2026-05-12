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

    // параметры анимации
    this.isAnimating = false;
    this.animationProgress = 0;
    this.animationDuration = 1.0;

    this.startPosition = new THREE.Vector3();
    this.targetPosition = new THREE.Vector3();

    this.startQuaternion = new THREE.Quaternion();
    this.targetQuaternion = new THREE.Quaternion();

    this.startLookAt = new THREE.Vector3();
    this.targetLookAt = new THREE.Vector3();

    this.currentLookAt = new THREE.Vector3(SCENE_WIDTH / 2, 0, SCENE_WIDTH / 4);
  }

  createOrthoCamera() {
    const size = this.frustumSize;

    const camera = new THREE.OrthographicCamera(
      (-size * this.aspect) / 2,
      (size * this.aspect) / 2,
      size / 2,
      -size / 2,
      0.1,
      1000,
    );

    return camera;
  }

  setMode(mode) {
    const centerX = SCENE_WIDTH / 2;
    const centerZ = SCENE_WIDTH / 4;

    this.mode = mode;

    // стартовые значения
    this.startPosition.copy(this.active.position);
    this.startLookAt.copy(this.currentLookAt);
    this.startQuaternion.copy(this.active.quaternion);

    this.active = this.perspective;

    if (mode === "2d") {
      this.targetPosition.set(centerX, SCENE_WIDTH / 2, centerZ + 2);

      this.targetLookAt.set(centerX, 0, centerZ);
      const tempCamera = this.perspective.clone();
      tempCamera.position.copy(this.targetPosition);
      tempCamera.up.set(0, 0, 1);
      tempCamera.lookAt(this.targetLookAt);
      this.targetQuaternion.copy(tempCamera.quaternion);
    } else {
      this.targetPosition.set(SCENE_WIDTH / 2, SCENE_WIDTH, SCENE_WIDTH);
      this.targetLookAt.set(centerX, 0, centerZ);
    }

    const tempCamera = this.perspective.clone();

    tempCamera.position.copy(this.targetPosition);
    tempCamera.up.set(0, 0, -1);
    tempCamera.lookAt(this.targetLookAt);
    this.targetQuaternion.copy(tempCamera.quaternion);

    this.animationProgress = 0;
    this.isAnimating = true;
  }

  update(delta) {
    if (!this.isAnimating) return;

    this.animationProgress += delta / this.animationDuration;

    const t = Math.min(this.animationProgress, 1);

    // smooth easing
    const eased = 1 - Math.pow(1 - t, 3);

    this.active.position.lerpVectors(
      this.startPosition,
      this.targetPosition,
      eased,
    );

    this.active.quaternion.slerpQuaternions(
      this.startQuaternion,
      this.targetQuaternion,
      eased,
    );

    this.perspective.updateProjectionMatrix();
    this.currentLookAt.lerpVectors(this.startLookAt, this.targetLookAt, eased);

    if (t >= 1) {
      this.isAnimating = false;

      // переключаемся на ortho
      if (this.mode === "2d") {
        this.orthographic.position.copy(this.active.position);

        // копируем rotation напрямую
        this.orthographic.quaternion.copy(this.active.quaternion);

        // одинаковый up vector
        this.orthographic.up.copy(this.active.up);

        this.orthographic.updateProjectionMatrix();

        const distance = this.active.position.distanceTo(this.currentLookAt);
        const vFov = THREE.MathUtils.degToRad(this.perspective.fov);
        const visibleHeight = 1.85 * Math.tan(vFov / 2) * distance;

        this.orthographic.zoom = this.frustumSize / visibleHeight;

        this.orthographic.updateProjectionMatrix();

        // переключение
        this.active = this.orthographic;
      }
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
