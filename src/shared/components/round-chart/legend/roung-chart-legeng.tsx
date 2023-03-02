import { RoundChartData } from "../types"

export const RoungChartLegeng = ({data}: {data: RoundChartData[]}) => {
  return (
    <>
      <g transform={`translate(${600} ${10})`}>
        {data.map((item, i) => {
          return <g className="flex" transform={`translate(${0} ${i * 35})`}>
            <rect
              width={25}
              height={25}
              fill={item.color}
            ></rect>
            <text transform={`translate(${40} ${18})`}>{item.name} - {item.value}</text>
          </g>
        })}
      </g>
    </>
  )
}