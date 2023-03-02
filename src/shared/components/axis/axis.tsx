import { axisBottom, axisLeft, max, min, select, Selection } from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

import { AxisProps} from "./types";


const AXIS_SELECTOR = {
  left: axisLeft,
  bottom: axisBottom,
}

export const Axis = ({scale, setAxisOffset, config}: AxisProps) => {
  const [chartContainerSelection, setChartContainerSelection ] = useState<Selection<SVGGElement, any, HTMLElement, any> | null>(null)
  const chartContainer = useRef(null);
  useEffect(() => {
    setChartContainerSelection(select<SVGGElement,any>(chartContainer.current))
  }, []);

  const extendedConfig = useMemo(() => ({
    tickSize: -20,
    tickPadding: 5,
    offset: {ticks: 10, line: 0},
    ticks: 5,
    padding: {ticks: 0, line: 0},
    tickFormat: (d) => `${d}`,
    axisColor: "#ECECEE",
    textColor: "#92959E",
    tickColor: "#ECECEE",
    ...config,
  }), []);

  const getTickTransform = (type: string) => type === 'left'
      ? `translate(${extendedConfig.offset.ticks},0)`
      : `translate(0,${extendedConfig.innerHeight + extendedConfig.offset.ticks})`

  const getLineTransform = (type: string) => type === 'left'
      ? `translate(${extendedConfig.offset.line},0)`
      : `translate(0,${extendedConfig.offset.line})`
  
  useMemo(() => {
    chartContainerSelection?.select('.axis')?.remove()
    chartContainerSelection?.select('.line')?.remove()
    
    chartContainerSelection?.append('g')
      .call(AXIS_SELECTOR[extendedConfig.type](scale)
        .ticks(extendedConfig.ticks)
        .tickFormat(extendedConfig.tickFormat)
        .tickSize(extendedConfig.tickSize)
        .tickPadding(extendedConfig.tickPadding)
      )
      .call(g => g.select(".domain")
        .remove())
      .call(g => g.selectAll(".tick line")
        .attr("stroke", "#ECECEE"))
      .call(g => g.selectAll(".tick text")
        .attr("color", "#92959E"))
      .attr("transform", getTickTransform(extendedConfig.type))
      .attr("class", `axis axis-${extendedConfig.type}`)

      const line = chartContainerSelection?.append("line")
        .call(g => g)
        .attr("stroke", extendedConfig.axisColor)
        .attr("transform", getLineTransform(extendedConfig.type))
        .attr("class", `line line-${extendedConfig.type}`)
      if( extendedConfig.type === 'left') {
        line?.attr("x1", "0")
          .attr("y1", min(scale.range()) - extendedConfig.padding.ticks + extendedConfig.padding.line)
          .attr("x2", 0)
          .attr("y2", max(scale.range()) + extendedConfig.padding.ticks - extendedConfig.padding.line )
          //@ts-ignore
          setAxisOffset(chartContainerSelection?.select('.axis')?.node<any,any,SVGGElement,any>()?.getBBox()?.width);
      } else {
        line?.attr("x1", min(scale.range()) - extendedConfig.padding.ticks + extendedConfig.padding.line)
          .attr("y1", extendedConfig.innerHeight)
          .attr("x2", max(scale.range()) + extendedConfig.padding.ticks - extendedConfig.padding.line )
          .attr("y2", extendedConfig.innerHeight)
        const ticks = chartContainerSelection?.selectAll('.tick').nodes()
        if ( ticks) {
          //@ts-ignore
          setAxisOffset(ticks[ticks?.length - 1]?.getBBox()?.width)
        }
      }

    console.log(`line-${extendedConfig.type}`)
  }, [chartContainerSelection, scale, extendedConfig])

  return (
    <>
      <g ref={chartContainer}>
      </g>
    </>
  )
}