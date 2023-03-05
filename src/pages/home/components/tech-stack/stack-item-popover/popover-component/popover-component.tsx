import { useContext } from "react";

import { AppContext } from "src/App";
import { Icon } from "src/shared";
import { StackItemPopoverComponentProps } from "./types";


export function StackItemPopoverComponent({data}: StackItemPopoverComponentProps) {
  const { theme } = useContext(AppContext);
  return (
    <>
      <div className="drop-shadow-md animated_opasity bg-white dark:bg-app-dark flex gap-5 md:gap-7 rounded-md flex-col max-w-4xl max-h-[65vh] w-[250px] overflow-y-scroll md:overflow-y-auto md:w-[375px] md:max-h-fit items-center">
        <div className="flex flex-col p-7 items-center">
          <div>
            <h3>{data.name}</h3>
            <p className="mt-2 md:mt-3">{data.description}</p>
          </div>
          <div className="flex flex-col w-full mt-3 md:mt-4">
              <div className="flex justify-between items-baseline">
                <h4>Expertise Level</h4>
                <span>{`${data.expertise}%`}</span>
              </div>
              <div className="flex w-full bg-gray-600 adaptive-col-item_6">
                <div style={{width: `${data.expertise}%`}} className="h-4 bg-red-800 "></div>
              </div>
          </div>
          <div className="flex justify-between mt-3 md:mt-4 w-full">
            <a href={data.projects} className="flex align-center gap-2">
              <Icon type='link' size={5} color={theme === 'light' ? 'gray-800' : 'zinc-300'}></Icon>
              <span>Projects where i used <strong>{data.name}</strong></span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}