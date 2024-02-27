import { Margins, ScalesInterface } from "../../types";
import { AxisConfig } from "../axis/types";

export interface LineChartConfig {
  legend?: boolean,
  width: number,
  height: number,
  margin?: Margins,
  axisConfigBottom: Partial<AxisConfig>,
  axisConfigLeft: Partial<AxisConfig>,
  lineConfig: LineConfig,
  areaConfig: Partial<AreaConfig>
}

export interface AreaConfig {
  color?:string;
  curve?: any;
  gradient?: {
    component: any;
    id: string;
  }
  innerHeight: number,
}

export interface LineConfig {
  color:string;
  width: number;
  curve?: any;
}

export interface LineChartPropsBase<T> {
  config: T,
  data: LineChartData[],
}

export interface ElementPropsBase<P> extends LineChartPropsBase<P>{
  scales: ScalesInterface,
}

export type LineChartData< m = any, x = any, y = any> = {
  x: x,
  y: y,
  meta?: m,
}