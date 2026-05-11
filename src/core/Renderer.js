import * as THREE from "three";

export class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    document.body.appendChild(this.renderer.domElement);
  }

  get() {
    return this.renderer;
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}
