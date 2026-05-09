import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SCENE_WIDTH } from "../constants/constants.js"

export class Controls {
  constructor(camera, renderer) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.target.set(SCENE_WIDTH/2, 0, 0);
  }

  update() {
    this.controls.update();
  }
}