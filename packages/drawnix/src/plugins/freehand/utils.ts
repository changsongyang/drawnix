import {
  getSelectedElements,
  idCreator,
  isPointInPolygon,
  PlaitBoard,
  Point,
} from '@plait/core';
import { DefaultFreehand, Freehand, FreehandShape } from './type';
import {
  DefaultDrawStyle,
  getFlowchartDefaultFill,
  isHitPolyLine,
} from '@plait/draw';
import { isFilled, sortElementsByArea } from '@plait/common';

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

export const isClosedFreehand = (element: Freehand) => {
  const points = element.points;
  if (!points || points.length < 2) {
    return false;
  }
  const startPoint = points[0];
  const endPoint = points[points.length - 1];
  return startPoint[0] === endPoint[0] && startPoint[1] === endPoint[1];
};

export const isHitFreehand = (
  board: PlaitBoard,
  element: Freehand,
  point: Point
) => {
  const points = element.points;
  if (isClosedFreehand(element)) {
    return isPointInPolygon(point, points) || isHitPolyLine(points, point);
  } else {
    return isHitPolyLine(points, point);
  }
};

export const getFillByElement = (board: PlaitBoard, element: Freehand) => {
  const defaultFill = isClosedFreehand(element)
    ? getFlowchartDefaultFill(board.theme.themeColorMode)
    : DefaultDrawStyle.fill;
  const fill = element.fill || defaultFill;
  return fill;
};

export const getFirstFilledFreehand = (
  board: PlaitBoard,
  elements: Freehand[]
) => {
  let filledElement: Freehand | null = null;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (isClosedFreehand(element)) {
      const fill = getFillByElement(board, element);
      if (isFilled(fill)) {
        filledElement = element;
        break;
      }
    }
  }
  return filledElement;
};

export const getFreehandHitElement = (
  board: PlaitBoard,
  elements: Freehand[]
) => {
  let firstFilledElement = getFirstFilledFreehand(board, elements);
  let endIndex = elements.length;
  if (firstFilledElement) {
    endIndex = elements.indexOf(firstFilledElement) + 1;
  }
  const newElements = elements.slice(0, endIndex);
  const sortElements = sortElementsByArea(board, newElements, 'asc');
  return sortElements[0];
};

export const getSelectedFreehandElements = (board: PlaitBoard) => {
  return getSelectedElements(board).filter((ele) => Freehand.isFreehand(ele));
};
