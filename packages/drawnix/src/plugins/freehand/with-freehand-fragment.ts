import {
  ClipboardData,
  PlaitBoard,
  PlaitElement,
  Point,
  RectangleClient,
  WritableClipboardContext,
  WritableClipboardOperationType,
  WritableClipboardType,
  addClipboardContext,
  createClipboardContext,
} from '@plait/core';
import { getSelectedFreehandElements } from './utils';
import { Freehand } from './type';
import { buildClipboardData, insertClipboardData } from '@plait/common';

export const withFreehandFragment = (baseBoard: PlaitBoard) => {
  const board = baseBoard as PlaitBoard;
  const { getDeletedFragment, buildFragment, insertFragment } = board;

  board.getDeletedFragment = (data: PlaitElement[]) => {
    const freehandElements = getSelectedFreehandElements(board);
    if (freehandElements.length) {
      data.push(...freehandElements);
    }
    return getDeletedFragment(data);
  };

  board.buildFragment = (
    clipboardContext: WritableClipboardContext | null,
    rectangle: RectangleClient | null,
    operationType: WritableClipboardOperationType,
    originData?: PlaitElement[]
  ) => {
    const freehandElements = getSelectedFreehandElements(board);
    if (freehandElements.length) {
      const elements = buildClipboardData(
        board,
        freehandElements,
        rectangle ? [rectangle.x, rectangle.y] : [0, 0]
      );
      if (!clipboardContext) {
        clipboardContext = createClipboardContext(
          WritableClipboardType.elements,
          elements,
          ''
        );
      } else {
        clipboardContext = addClipboardContext(clipboardContext, {
          type: WritableClipboardType.elements,
          elements,
          text: '',
        });
      }
    }
    return buildFragment(
      clipboardContext,
      rectangle,
      operationType,
      originData
    );
  };

  board.insertFragment = (
    clipboardData: ClipboardData | null,
    targetPoint: Point,
    operationType?: WritableClipboardOperationType
  ) => {
    const freehandElements = clipboardData?.elements?.filter((value) =>
      Freehand.isFreehand(value)
    ) as Freehand[];
    if (freehandElements && freehandElements.length > 0) {
      insertClipboardData(board, freehandElements, targetPoint);
    }
    insertFragment(clipboardData, targetPoint, operationType);
  };

  return board;
};
