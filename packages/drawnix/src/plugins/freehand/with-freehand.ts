import {
  isPolylineHitRectangle,
  PlaitBoard,
  PlaitElement,
  PlaitOptionsBoard,
  PlaitPluginElementContext,
  RectangleClient,
  Selection,
} from '@plait/core';
import { Freehand } from './type';
import { FreehandComponent } from './freehand.component';
import { withFreehandCreate } from './with-freehand-create';
import { isHitFreehand } from './utils';
import { withFreehandFragment } from './with-freehand-fragment';
import {
  getHitDrawElement,
  WithDrawOptions,
  WithDrawPluginKey,
} from '@plait/draw';

export const withFreehand = (board: PlaitBoard) => {
  const {
    getRectangle,
    drawElement,
    isHit,
    isRectangleHit,
    getHitElement,
    isMovable,
    isAlign,
  } = board;

  board.drawElement = (context: PlaitPluginElementContext) => {
    if (Freehand.isFreehand(context.element)) {
      return FreehandComponent;
    }
    return drawElement(context);
  };

  board.getRectangle = (element: PlaitElement) => {
    if (Freehand.isFreehand(element)) {
      return RectangleClient.getRectangleByPoints(element.points);
    }
    return getRectangle(element);
  };

  board.isRectangleHit = (element: PlaitElement, selection: Selection) => {
    if (Freehand.isFreehand(element)) {
      const rangeRectangle = RectangleClient.getRectangleByPoints([
        selection.anchor,
        selection.focus,
      ]);
      const client = RectangleClient.getRectangleByPoints(element.points);
      const rotatedCornerPoints = RectangleClient.getCornerPoints(client);
      return isPolylineHitRectangle(rotatedCornerPoints, rangeRectangle);
    }
    return isRectangleHit(element, selection);
  };

  board.isHit = (element, point) => {
    if (Freehand.isFreehand(element)) {
      return isHitFreehand(board, element, point);
    }
    return isHit(element, point);
  };

  board.getHitElement = (elements) => {
    const isAllFreehand = elements.every((item) => Freehand.isFreehand(item));
    if (isAllFreehand) {
      return getHitDrawElement(board, elements);
    }
    return getHitElement(elements);
  };

  board.isMovable = (element) => {
    if (Freehand.isFreehand(element)) {
      return true;
    }
    return isMovable(element);
  };

  board.isAlign = (element) => {
    if (Freehand.isFreehand(element)) {
      return true;
    }
    return isAlign(element);
  };

  (board as PlaitOptionsBoard).setPluginOptions<WithDrawOptions>(
    WithDrawPluginKey,
    { customGeometryTypes: ['freehand'] }
  );

  return withFreehandFragment(withFreehandCreate(board));
};
