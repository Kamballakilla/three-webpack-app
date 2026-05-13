import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

export class ShopLabel {
  constructor(text, height = 0, width = 0) {
    this.scaleFactor = 8;
    this.text = text;
    this.height = height;
    ((this.width = width), (this.element = this.createElement()));

    this.label = this.createLabel();
  }

  createElement() {
    const div = document.createElement("div");

    div.className = "shop-label";
    div.textContent = this.text;
    div.style.width = `${this.width * this.scaleFactor}px`;

    return div;
  }

  createLabel() {
    const label = new CSS2DObject(this.element);

    const offset = 0.1;
    label.position.set(0, this.height / 2 + offset, 0);

    return label;
  }

  get() {
    return this.label;
  }
}
