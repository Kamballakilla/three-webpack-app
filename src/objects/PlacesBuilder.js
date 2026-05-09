import { PlacesDataFactory } from "../services/PlacesDataFactory.js";
import { Shop } from "./Shop.js";

export class PlacesBuilder {
  constructor() {
    this.shops = [];

    this.factory = new PlacesDataFactory({
      count: 100,
      minSize: 1,
      maxSize: 10,
    });
  }

  build(layoutFn) {
    const rawData = this.factory.generate();

    const positionedData = layoutFn(rawData,0);

    this.shops = positionedData.map(
      item => new Shop(item)
    );

    return this.shops;
  }

  getShops() {
    return this.shops;
  }

  getById(id) {
    return this.shops.find(
      shop => shop.data.id === id
    );
  }

  clear() {
    this.shops = [];
  }
}