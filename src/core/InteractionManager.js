import * as THREE from "three";

export class InteractionManager {
  constructor({ camera, domElement, objects = [] }) {
    this.camera = camera;
    this.domElement = domElement;
    this.objects = objects;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.hoveredObject = null;

    this.onHover = null;

    this.selectedObject = null;

    this.onSelect = null;

    this.bindEvents();
  }

  bindEvents() {
    this.domElement.addEventListener("pointermove", this.handlePointerMove);
    this.domElement.addEventListener("click", this.handleClick);
  }

  handlePointerMove = (event) => {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;

    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.pointer, this.camera);

    const intersections = this.raycaster.intersectObjects(this.objects, false);

    const object = intersections[0]?.object || null;

    if (this.hoveredObject === object) return;

    const previous = this.hoveredObject;

    this.hoveredObject = object;

    if (this.onHover) {
      this.onHover({
        previous,
        current: object,
      });
    }
  };

  handleClick = () => {
    this.selectedObject = this.hoveredObject;

    if (this.onSelect) {
      this.onSelect(this.selectedObject);
    }
  };

  updateCamera(camera) {
    this.camera = camera;
  }

  dispose() {
    this.domElement.removeEventListener("pointermove", this.handlePointerMove);
    this.domElement.removeEventListener("click", this.handleClick);
  }
}
