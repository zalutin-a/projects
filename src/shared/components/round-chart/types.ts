export interface RoundChartConfig {
  legend: boolean,
  width: number,
  height: number,
  startAngle: number,
  endAngle: number,
  innerRadius: number,
}

export interface RoundChartData extends ColorNameValue {
}

export interface NameValue {
  name: string,
  value: number,
}

export interface ColorNameValue extends NameValue {
  color: string;
}
