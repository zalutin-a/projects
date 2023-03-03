import { useEffect, useState } from "react";

import { Slider, TechStackItem } from "src/shared/index";
import { StackItem } from "./stack-item/stack-item";
import { StackItemPopover } from "./stack-item-popover/stack-item-popover";


export function TechStack() {
  const [data, setData] = useState<TechStackItem[]>(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('data/tech-stack.json');
      const data = await res.json();
      setData(data as TechStackItem[]);
    }

    fetchData()
  },[]);

  return (
    <>
      <div className="flex flex-col max-w-4xl w-full items-center">
        <div className="flex flex-col items-center text-center">
          <h2>My Tech Stack</h2>
          <p className="adaptive-col-item_12">Technologies I`ve been working with recently</p>
        </div>
        <div className="w-full mt-10 md:mt-14">
          <Slider slidingOffset={2} showArrow={true}>
            {data?.map(stackItem => {
              return (
                <div key={stackItem.id} className="adaptive-row-item_32 cursor-pointer">
                  <StackItemPopover data={stackItem}>
                      <StackItem data={stackItem}></StackItem>
                  </StackItemPopover>
                </div>
              )})}
          </Slider>
        </div>
      </div>
    </>
  )
}