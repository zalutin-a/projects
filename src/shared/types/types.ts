import { ScaleBand, ScaleLinear } from "d3";

export interface Margins {
    top?: number,
    right?: number,
    bottom?: number,
    left?: number,
}

export interface ScalesInterface<T = any, P = any> {
    y: ScaleLinear<T, T, never>;
    x: ScaleBand<P> | ScaleLinear<T, T, never>;
  }
  