import { StrokeStyle } from '@plait/common';
import { DEFAULT_COLOR, PlaitElement, Point } from '@plait/core';
import { PlaitCustomGeometry } from '@plait/draw';

export const DefaultFreehand = {
  strokeColor: DEFAULT_COLOR,
  strokeWidth: 4,
};

export enum FreehandShape {
  nibPen = 'nibPen',
  feltTipPen = 'feltTipPen',
  artisticBrush = 'artisticBrush',
  markerHighlight = 'markerHighlight',
}

export interface Freehand
  extends PlaitCustomGeometry<'freehand', Point[], FreehandShape> {}

export const Freehand = {
  isFreehand: (value: any): value is Freehand => {
    return value.type === 'freehand';
  },
};
