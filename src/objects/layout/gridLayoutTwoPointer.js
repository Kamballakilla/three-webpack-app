import { SCENE_WIDTH } from '../../constants/constants.js'
export function gridLayoutTwoPointer(
  items,
  gap = 0
) {
 

  let cursorX = 0;
  let cursorZ = 0;
  let rowHeight = 0;

  return items.map(item => {
    // перенос строки
    if (cursorX + item.width > SCENE_WIDTH) {
      cursorX = 0;
      cursorZ += rowHeight + gap;
      rowHeight = 0;
    }

    const positionedItem = {
      ...item,
      position: {
        x: cursorX + item.width / 2,
        y: 0,
        z: cursorZ + item.depth / 2
      }
    };

    cursorX += item.width + gap;

    rowHeight = Math.max(
      rowHeight,
      item.depth
    );

    return positionedItem;
  });
}