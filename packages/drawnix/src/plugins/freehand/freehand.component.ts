import {
  PlaitBoard,
  PlaitPluginElementContext,
  OnContextChanged,
  RectangleClient,
  isSelectionMoving,
} from '@plait/core';
import { ActiveGenerator, CommonElementFlavour } from '@plait/common';
import { Freehand } from './type';
import { FreehandGenerator } from './freehand.generator';

export class FreehandComponent
  extends CommonElementFlavour<Freehand, PlaitBoard>
  implements OnContextChanged<Freehand, PlaitBoard>
{
  constructor() {
    super();
  }

  activeGenerator!: ActiveGenerator<Freehand>;

  generator!: FreehandGenerator;

  initializeGenerator() {
    this.activeGenerator = new ActiveGenerator<Freehand>(this.board, {
      getRectangle: (element: Freehand) => {
        return RectangleClient.getRectangleByPoints(element.points);
      },
      getStrokeWidth: () => 0,
      getStrokeOpacity: () => 0,
      hasResizeHandle: () => {
        return !isSelectionMoving(this.board);
      },
    });
    this.generator = new FreehandGenerator(this.board);
  }

  initialize(): void {
    super.initialize();
    this.initializeGenerator();
    this.generator.processDrawing(this.element, this.getElementG());
  }

  onContextChanged(
    value: PlaitPluginElementContext<Freehand, PlaitBoard>,
    previous: PlaitPluginElementContext<Freehand, PlaitBoard>
  ) {
    if (value.element !== previous.element) {
    } else {
      const hasSameSelected = value.selected === previous.selected;
    }
  }

  destroy(): void {
    super.destroy();
  }
}
