import {
  PlaitBoard,
  PlaitElement,
  PlaitPluginElementContext,
  RectangleClient,
} from '@plait/core';
import { Freehand } from './type';
import { FreehandComponent } from './freehand.component';
import { withFreehandCreate } from './with-freehand-create';

export const withFreehand = (board: PlaitBoard) => {
  const { getRectangle, drawElement } = board;

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

  return withFreehandCreate(board);
};
