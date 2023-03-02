import { ScaleBand, ScaleLinear, ScaleTime } from "d3";

export type scale = ScaleLinear<any, any> | ScaleBand<any> | ScaleTime<any, any>;

export interface AxisConfig {
  type: 'left' | 'bottom',
  innerHeight: number,
  ticks?: number,
  tickSize?: number;
  tickPadding?: number,
  offset?: {ticks?: number, line?: number},
  padding: {ticks?: number, line?: number},
  tickFormat?: (d: any) => any;
  axisColor?: string,
  textColor?: string,
  tickColor?: string,
}

export interface AxisProps {
  scale: scale,
  setAxisOffset?: React.Dispatch<React.SetStateAction<number>>,
  config: AxisConfig,
}
