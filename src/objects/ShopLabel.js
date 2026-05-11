import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export class ShopLabel {
  constructor(text) {
    this.text = text;

    this.element = this.createElement();
    this.label = this.createLabel();
  }

  createElement() {
    const div = document.createElement('div');

    div.className = 'shop-label';
    div.textContent = this.text;

    return div;
  }

  createLabel() {
    const label = new CSS2DObject(this.element);

    label.position.set(0, 2.2, 0);

    return label;
  }

  get() {
    return this.label;
  }
}