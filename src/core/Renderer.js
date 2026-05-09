import * as THREE from "three";

export class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);
  }

  get() {
    return this.renderer;
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}