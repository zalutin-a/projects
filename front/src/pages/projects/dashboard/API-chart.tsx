import { curveCardinal, format } from "d3"
import { SVGLinearGradient, Icon, LineChart, LineChartConfig,  } from "src/shared"


const chartConfig: LineChartConfig = {
  margin: {
    right: 0,
  //   top: 5,
    left: 0,
    // bottom: 100,
  },
  width: 900,
  height: 450,
  axisConfigLeft:{
    type: 'left',
    padding: {ticks: 0, line: 0},
    offset: {ticks: -10, line: 0},
    // tickPadding: 40
    tickFormat: format("~s"),
    ticks: 4,
  },
  axisConfigBottom: {
    type: 'bottom',
    padding: {ticks: 0, line: 0},

    // tickPadding: 0
    // tickFormat: format("~s"),
  },
  lineConfig: {
    color: "#7549FF",
    width: 2,
    curve: curveCardinal,
  },
  areaConfig: {
    curve: curveCardinal,
    gradient: {
      component: <SVGLinearGradient config={{id: "area-gradient"}}></SVGLinearGradient>,
      id: "area-gradient",
    }
  }
}

export const APIChart = ({data}: {data: any}) => {
  
  return (
    <div className='bg-stone-50 rounded-3xl flex flex-col w-fit px-10 py-9 min-w-[90%]'>
      <div className="flex w-full justify-between">
        <h3 className="text-base text-2xl font-semibold">API Calls in last 6 hours</h3>
        <Icon type='filter' size={8} color="hover-gray-400"></Icon>
      </div>
      <div className="mt-7 w-full" >
        <LineChart data={data} config={chartConfig}></LineChart>
      </div>
    </div>

  )
}