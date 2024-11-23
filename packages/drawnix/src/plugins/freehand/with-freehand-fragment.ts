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

//   board.buildFragment = (
//     clipboardContext: WritableClipboardContext | null,
//     rectangle: RectangleClient | null,
//     operationType: WritableClipboardOperationType,
//     originData?: PlaitElement[]
//   ) => {
//     const freehandElements = getSelectedFreehandElements(board);
//     if (freehandElements.length) {
//       const elements = buildClipboardData(
//         board,
//         freehandElements,
//         rectangle ? [rectangle.x, rectangle.y] : [0, 0]
//       );
//       const text = '';
//       if (!clipboardContext) {
//         clipboardContext = createClipboardContext(
//           WritableClipboardType.elements,
//           elements,
//           text
//         );
//       } else {
//         clipboardContext = addClipboardContext(clipboardContext, {
//           text,
//           type: WritableClipboardType.elements,
//           elements,
//         });
//       }
//     }
//     return buildFragment(
//       clipboardContext,
//       rectangle,
//       operationType,
//       originData
//     );
//   };

//   board.insertFragment = (
//     clipboardData: ClipboardData | null,
//     targetPoint: Point,
//     operationType?: WritableClipboardOperationType
//   ) => {
//     if (clipboardData?.elements?.length) {
//       const freehandElements = clipboardData.elements?.filter((value) =>
//         Freehand.isFreehand(value)
//       ) as Freehand[];
//       if (
//         clipboardData.elements &&
//         clipboardData.elements.length > 0 &&
//         freehandElements.length > 0
//       ) {
//         insertClipboardData(board, freehandElements, targetPoint);
//       }
//     }
//     insertFragment(clipboardData, targetPoint, operationType);
//   };

  return board;
};
