import * as THREE from "three";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";

import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

export class PostProcessor {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    this.composer = new EffectComposer(renderer);

    this.renderPass = new RenderPass(scene, camera);

    this.composer.addPass(this.renderPass);

    this.outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera,
    );

    this.outlinePass.edgeStrength = 6;
    this.outlinePass.edgeGlow = 0.5;
    this.outlinePass.edgeThickness = 2;
    this.outlinePass.pulsePeriod = 0;

    this.outlinePass.visibleEdgeColor.set("#00ffff");

    this.outlinePass.hiddenEdgeColor.set("#00ffff");

    this.composer.addPass(this.outlinePass);

    // FXAA для рендеринг через composer
    this.fxaaPass = new ShaderPass(FXAAShader);

    this.updateFXAAResolution();

    this.outputPass = new OutputPass();

    this.composer.addPass(this.outputPass);

    this.composer.addPass(this.fxaaPass);
  }

  updateFXAAResolution() {
    const pixelRatio = this.renderer.getPixelRatio();

    this.fxaaPass.material.uniforms["resolution"].value.x =
      1 / (window.innerWidth * pixelRatio);

    this.fxaaPass.material.uniforms["resolution"].value.y =
      1 / (window.innerHeight * pixelRatio);
  }

  setSelected(objects = []) {
    this.outlinePass.selectedObjects = objects;
  }

  render() {
    this.composer.render();
  }

  resize() {
    this.composer.setSize(window.innerWidth, window.innerHeight);

    this.outlinePass.resolution.set(window.innerWidth, window.innerHeight);

    this.updateFXAAResolution();
  }

  updateCamera(camera) {
    this.renderPass.camera = camera;

    this.outlinePass.renderCamera = camera;
  }
}
