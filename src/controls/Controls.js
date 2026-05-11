import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SCENE_WIDTH } from "../constants/constants.js";

export class Controls {
  constructor(camera, renderer) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.target.set(SCENE_WIDTH / 2, 0, 0);
  }

  setMode(mode, camera) {
    const centerX = SCENE_WIDTH / 2;
    const centerZ = SCENE_WIDTH / 4;
    this.controls.object = camera;

    if (mode === "2d") {
      this.controls.target.set(centerX, 0, centerZ);
      this.controls.enableRotate = false;
      this.controls.enablePan = false;
      this.controls.enableZoom = true;
    } else {
      this.controls.enableRotate = true;
      this.controls.enablePan = true;
      this.controls.enableZoom = true;
    }

    this.controls.update();
  }

  update() {
    this.controls.update();
  }
}
