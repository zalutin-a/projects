import { area } from "d3";

import { AreaConfig, LineChartData, ElementPropsBase } from "./types";


export const LineArea = ({scales, config, data}: ElementPropsBase<AreaConfig>) => {
  const areaConstructor = area<LineChartData>()
    .x((d) => scales.x(d.x))
    .y0(config.innerHeight)
    .y1((d) => scales.y(d.y))

  if (config.curve) {
    areaConstructor.curve(config.curve);
  }

  return (
    <>
      <g className="area">
        {config.gradient.component ?? <></>}
        <path d={areaConstructor(data)} fill={config.gradient
          ? `url(#${config.gradient.id})`
          : config.color
            ? config.color : 'none'}>
        </path>
      </g>
    </>
  )
}