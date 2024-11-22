import { StrokeStyle } from '@plait/common';
import { DEFAULT_COLOR, PlaitElement, Point } from '@plait/core';

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

export interface Freehand extends PlaitElement {
  type: 'freehand';
  points: Point[];
  shape: FreehandShape;
  strokeColor?: string;
  strokeWidth?: number;
  strokeStyle?: StrokeStyle;
  fill?: string;
}

export const Freehand = {
  isFreehand: (value: any): value is Freehand => {
    return value.type === 'freehand';
  },
};
