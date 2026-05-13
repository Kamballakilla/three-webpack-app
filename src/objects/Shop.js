import * as THREE from "three";
import { ShopLabel } from "./ShopLabel.js";

export class Shop {
  constructor(data) {
    this.data = data;

    this.height = 10;

    this.defaultColor = new THREE.Color(data.color);
    this.hoverColor = new THREE.Color("#ffd166");

    this.isHovered = false;

    this.createMesh();
  }

  createMesh() {
    const geometry = new THREE.BoxGeometry(
      this.data.width,
      this.height,
      this.data.depth,
    );

    this.material = new THREE.MeshStandardMaterial({
      color: this.defaultColor.clone(),
      emissive: 0x000000,
    });

    this.mesh = new THREE.Mesh(geometry, this.material);

    this.mesh.position.set(
      this.data.position.x,
      this.height / 2,
      this.data.position.z,
    );

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.mesh.userData = {
      id: this.data.id,
      name: this.data.name,
      width: this.data.width,
      depth: this.data.depth,
      shop: this,
    };

    this.label = new ShopLabel(this.data.name, this.height, this.data.width);
    this.mesh.add(this.label.get());
  }

  setHover(state) {
    if (this.isHovered === state) return;

    this.isHovered = state;

    if (state) {
      this.material.emissive.setHex(0x444444);
    } else {
      this.material.emissive.setHex(0x000000);
    }
  }

  update(camera) {
    const distance = camera.position.distanceTo(this.mesh.position);

    const labelObj = this.label.get();
    const el = this.label.element;

    if (camera.isOrthographicCamera) {
      labelObj.visible = true;
      el.style.opacity = 1;

      return;
    }

    const maxDistance = 40;
    const minDistance = 30;

    let opacity = 1;

    if (distance > maxDistance) {
      opacity = 0;
    } else if (distance > minDistance) {
      opacity = 1 - (distance - minDistance) / (maxDistance - minDistance);
    }

    labelObj.visible = opacity > 0;
    el.style.opacity = opacity;
  }

  get() {
    return this.mesh;
  }
}
