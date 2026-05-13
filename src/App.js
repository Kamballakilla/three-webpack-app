import * as THREE from "three";

import { Scene } from "./core/Scene.js";
import { Camera } from "./core/Camera.js";
import { Renderer } from "./core/Renderer.js";
import { LabelRenderer } from "./core/LabelRenderer.js";
import { PostProcessor } from "./core/PostProcessor.js";

import { Controls } from "./controls/Controls.js";

import { Lights } from "./core/Lights.js";

import { PlacesBuilder } from "./objects/PlacesBuilder.js";

import { gridLayoutTwoPointer } from "./objects/layout/gridLayoutTwoPointer.js";

import { InteractionManager } from "./core/InteractionManager.js";

export class App {
  constructor() {
    this.scene = new Scene();

    this.camera = new Camera();

    this.renderer = new Renderer();

    this.postProcessor = new PostProcessor(
      this.renderer.get(),
      this.scene.get(),
      this.camera.get(),
    );

    this.labelRenderer = new LabelRenderer();

    this.clock = new THREE.Clock();

    this.controls = new Controls(this.camera.get(), this.renderer.get());

    this.lights = new Lights();
    this.scene.get().add(this.lights.get());

    // SHOPS
    this.places = new PlacesBuilder();
    this.shops = this.places.build(gridLayoutTwoPointer);
    this.shops.forEach((shop) => {
      this.scene.get().add(shop.get());
    });

    this.shopMeshes = this.shops.map((shop) => shop.get());

    this.interaction = new InteractionManager({
      camera: this.camera.get(),
      domElement: this.renderer.get().domElement,
      objects: this.shopMeshes,
    });

    this.interaction.onHover = ({ previous, current }) => {
      if (previous) {
        previous.userData.shop.setHover(false);
      }

      if (current) {
        current.userData.shop.setHover(true);
      }
    };

    this.bindEvents();
    this.animate();
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.camera.resize();
      this.renderer.resize();
      this.postProcessor.resize();
      this.labelRenderer.resize();
    });

    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        const next = this.camera.getMode() === "3d" ? "2d" : "3d";

        this.camera.setMode(next);
        this.controls.setMode(next, this.camera.get());
      }
    });
  }

  update() {
    const delta = this.clock.getDelta();

    this.camera.update(delta);

    this.controls.update();

    const camera = this.camera.get();

    this.postProcessor.updateCamera(camera);
    this.interaction.updateCamera(camera);

    this.shops.forEach((shop) => {
      shop.update(camera);
    });
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    this.update();
    
    this.postProcessor.render();

    this.labelRenderer.render(this.scene.get(), this.camera.get());
  };
}
