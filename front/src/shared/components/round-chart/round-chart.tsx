import { arc, pie, PieArcDatum } from "d3";
import { useMemo } from "react";
import { RoungChartLegeng } from "./legend/roung-chart-legeng";
import { RoundChartConfig, RoundChartData } from "./types"

export const RoundChart = ({ data, config }: {data: RoundChartData[], config: RoundChartConfig}) => {
  const configuredArc = useMemo(() => {
    return  arc<PieArcDatum<RoundChartData>>()
    .innerRadius(config.innerRadius)
    .outerRadius(config.width/2)
    .padAngle(0.01);
  }, [config])

  const calculatedData = useMemo(() => {
    return pie<any, RoundChartData>()
    .startAngle(config.startAngle)
    .endAngle(config.endAngle)
    .value(datum => datum.value)(data)
    .sort();
  }, [config, data])
  
  return (
    <svg width={config.width + 200} height={config.height}>
      <g transform={`translate(${config.width/2} ${config.height/2})`}>
        {calculatedData.map(item => {
        return <g>
          <path
            d={configuredArc(item)!}
            fill={item.data.color}
          ></path>
          <title>{item.data.name} - {item.data.value}</title>
          </g>
        })}
      </g>
      <RoungChartLegeng data={data}></RoungChartLegeng>
    </svg>
  )
}