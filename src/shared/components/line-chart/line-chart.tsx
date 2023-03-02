import { max, min, scaleBand, scaleLinear } from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

import { Axis } from "../axis/axis";
import { LineChartConfig, LineChartPropsBase, } from "./types"
import { AxisConfig } from "../axis/types";
import { Line } from "./line";
import { LineArea } from "./area";


export const LineChart = ({ data, config, }: LineChartPropsBase<LineChartConfig>) => {
  const [chartWidth, setChartWidth ] = useState<number>(0);
  const [leftAxisOffset, setLeftAxisOffset ] = useState(0);
  const [bottomAxisOffset, setBottomAxisOffset ] = useState(0);
  const chartContainer = useRef(null);
  useEffect(() => {
    setChartWidth(chartContainer?.current?.offsetWidth);
  }, []);

  const margin = {top: 0, right: 0, bottom: 40, left: 0, ...config.margin};
  const innerWidth = chartWidth - margin.right - margin.left - (bottomAxisOffset/2) - leftAxisOffset ;
  const innerHeight = config.height - margin.top - margin.bottom;
  const axisConfigLeft = {
    innerHeight,
    ...config.axisConfigLeft
  }
  const axisConfigBottom = useMemo(() => ({
    innerHeight,
    ...config.axisConfigBottom
  }),[])
  
  const lineConfig = {
  ...config.lineConfig,
  }

  const areaConfig = {
    innerHeight,
    ...config.areaConfig,
  }

  const scales = useMemo(() => ({
    x: typeof data[0].x === 'number'
      ? scaleLinear([0 + axisConfigBottom.padding.ticks, innerWidth - axisConfigBottom.padding.ticks])
        .domain([min(data, item => item.x), max(data, item => item.x)])
      : scaleBand([0 + axisConfigBottom.padding.ticks, innerWidth - axisConfigBottom.padding.ticks])
        .domain(data.map(item => item.x))
        .paddingInner(1),
    y: scaleLinear([innerHeight - axisConfigLeft.padding.ticks, 0 + axisConfigLeft.padding.ticks])
      .domain([min(data, item => item.y)* 0.9, max(data, item => item.y) * 1.1]),
  }),[axisConfigBottom.padding.ticks, axisConfigLeft.padding.ticks, innerHeight, innerWidth, leftAxisOffset, data]);

  return (
    <div ref={chartContainer}>
      <svg width={chartWidth} height={config.height}>
        <g transform={`translate(${margin.left + leftAxisOffset + config.axisConfigLeft.offset.ticks } ${margin.top})`}>
          <Axis scale={scales.y} setAxisOffset={setLeftAxisOffset} config={axisConfigLeft as AxisConfig}></Axis>
          <Axis scale={scales.x} setAxisOffset={setBottomAxisOffset} config={axisConfigBottom as AxisConfig}></Axis>
          <Line scales={scales} config={lineConfig} data={data}></Line>
          <LineArea scales={scales} config={areaConfig} data={data}></LineArea>
        </g>
      </svg>
    </div>
  )
}