import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export class LabelRenderer {
  constructor() {
    this.renderer = new CSS2DRenderer();

    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = '0';
    this.renderer.domElement.style.left = '0';

    // иначе labels будут ломать raycasting
    this.renderer.domElement.style.pointerEvents = 'none';

    document.body.appendChild(
      this.renderer.domElement
    );
  }

  get() {
    return this.renderer;
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
  }

  resize() {
    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }
}