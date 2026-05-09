import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class Controls {
  constructor(camera, renderer) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enableDamping = true;
  }

  update() {
    this.controls.update();
  }
}