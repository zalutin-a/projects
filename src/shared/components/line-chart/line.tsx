import { curveCardinal, line } from "d3";
import { useEffect, useRef, useState } from "react";

import { LineChartData, LineConfig, ElementPropsBase } from "./types";


export const Line = ({scales, config, data}: ElementPropsBase<LineConfig>) => {
  const [lineWidth, setLineWidth ] = useState<number>(0);
  const linePathContainer = useRef(null)
  useEffect(() => {
    setLineWidth(linePathContainer?.current?.getTotalLength());
  }, [scales]);


  const extendedConfig = {
    color: "#7549FF",
    width: 3,
    curve: curveCardinal,
    ...config,
  }
  
  const configuredLine = line<LineChartData>()
    .x(d => scales.x(d.x))
    .y(d => scales.y(d.y))
  
  if(config.curve) {
    configuredLine.curve(extendedConfig.curve)
  }

console.log(lineWidth)

  return (
    <>
      <path
        ref={linePathContainer}
        fill="none"
        strokeWidth={extendedConfig.width}
        stroke={extendedConfig.color}
        strokeDashoffset={lineWidth}
        strokeDasharray={lineWidth}
        d={configuredLine(data)} 
      >
        <animate
          attributeName="stroke-dashoffset"
          from={lineWidth}
          to={0}
          dur="0.7s"
          fill="freeze"
        />
      </path>
    </>
  )
}