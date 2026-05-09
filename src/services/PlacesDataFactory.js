import { shopNames } from '../constants/constants.js'

export class PlacesDataFactory {
  constructor({
    count = 100,
    minSize = 1,
    maxSize = 10,
    seed = null
  } = {}) {
    this.count = count;
    this.minSize = minSize;
    this.maxSize = maxSize;

    // опционально для воспроизводимости
    this.random = seed ? this.mulberry32(seed) : Math.random;
  }

  // простая seeded random (если нужно детерминированное поведение)
  mulberry32(seed) {
    return function () {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  getRandomFromArray(arr) {
    return arr[Math.floor(this.random() * arr.length)];
  }

  getRandomSize() {
    return (
      Math.floor(this.random() * (this.maxSize - this.minSize + 1)) +
      this.minSize
    );
  }

  getRandomColor() {
    return Math.floor(this.random() * 0xffffff);
  }

  generate() {
    return Array.from({ length: this.count }, (_, i) => {
      return {
        id: `shop_${String(i + 1).padStart(3, "0")}`,
        name: this.getRandomFromArray(shopNames),
        width: this.getRandomSize(),
        depth: this.getRandomSize(),
        color: this.getRandomColor()
      };
    });
  }
}