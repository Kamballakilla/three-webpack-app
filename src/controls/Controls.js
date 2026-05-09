import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class Controls {
  constructor(camera, renderer) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.target.set(60, 0, 0);
  }

  update() {
    this.controls.update();
  }
}