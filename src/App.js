import { Scene } from "./core/Scene.js";
import { Camera } from "./core/Camera.js";
import { Renderer } from "./core/Renderer.js";
import { LabelRenderer } from "./core/LabelRenderer.js";

import { Controls } from "./controls/Controls.js";

import { Lights } from "./core/Lights.js";

import { PlacesBuilder } from "./objects/PlacesBuilder.js";

import { gridLayoutTwoPointer } from "./objects/layout/gridLayoutTwoPointer.js";

export class App {
  constructor() {
    this.scene = new Scene();

    this.camera = new Camera();

    this.renderer = new Renderer();

    this.labelRenderer = new LabelRenderer();

    this.controls = new Controls(this.camera.get(), this.renderer.get());

    this.lights = new Lights();
    this.scene.get().add(this.lights.get());

    // SHOPS
    this.places = new PlacesBuilder();
    const shops = this.places.build(gridLayoutTwoPointer);
    shops.forEach((shop) => {
      this.scene.get().add(shop.get());
    });

    this.bindEvents();
    this.animate();
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.camera.resize();
      this.renderer.resize();
      this.labelRenderer.resize();
    });
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    this.controls.update();

    this.renderer.render(this.scene.get(), this.camera.get());

    this.labelRenderer.render(this.scene.get(), this.camera.get());
  };
}
