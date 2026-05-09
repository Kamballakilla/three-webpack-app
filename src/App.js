import { Scene } from "./core/Scene.js";
import { Camera } from "./core/Camera.js";
import { Renderer } from "./core/Renderer.js";
import { Lights } from "./core/Lights.js";
import { Controls } from "./controls/Controls.js";
import { Cube } from "./objects/Cube.js";

export class App {
  constructor() {
    this.scene = new Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();

    this.controls = new Controls(this.camera.get(), this.renderer.get());

    this.lights = new Lights();

    this.scene.get().add(this.lights.get());

    this.cube = new Cube();

    this.scene.get().add(this.cube.get());

    this.bindEvents();
    this.animate();
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.camera.resize();
      this.renderer.resize();
    });
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    this.cube.update();
    this.controls.update();

    this.renderer.get().render(this.scene.get(), this.camera.get());
  };
}
