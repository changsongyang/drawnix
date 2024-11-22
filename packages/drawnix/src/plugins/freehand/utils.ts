import { idCreator, Point } from '@plait/core';
import { DefaultFreehand, Freehand, FreehandShape } from './type';

export function getFreehandPointers() {
  return [FreehandShape.feltTipPen];
}

export const createFreehandElement = (
  shape: FreehandShape,
  points: Point[]
): Freehand => {
  const element: Freehand = {
    id: idCreator(),
    type: 'freehand',
    shape,
    points,
    strokeWidth: DefaultFreehand.strokeWidth,
    strokeColor: DefaultFreehand.strokeColor,
  };
  return element;
};
