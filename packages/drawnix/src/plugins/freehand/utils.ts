import {
  getSelectedElements,
  idCreator,
  isPointInPolygon,
  PlaitBoard,
  Point,
} from '@plait/core';
import { DefaultFreehand, Freehand, FreehandShape } from './type';
import { isClosedPoints, isHitPolyLine } from '@plait/draw';

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

export const isHitFreehand = (
  board: PlaitBoard,
  element: Freehand,
  point: Point
) => {
  const points = element.points;
  if (isClosedPoints(element.points)) {
    return isPointInPolygon(point, points) || isHitPolyLine(points, point);
  } else {
    return isHitPolyLine(points, point);
  }
};

export const getSelectedFreehandElements = (board: PlaitBoard) => {
  return getSelectedElements(board).filter((ele) => Freehand.isFreehand(ele));
};
