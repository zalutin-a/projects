import { useContext } from "react";

import { AppContext } from "src/App";
import { Icon } from "src/shared";
import { ProjectCartProps } from "./types";


export function ProjectCard({data}: ProjectCartProps) {
  const { theme } = useContext(AppContext);

  return (
    <>
      <div className="bg-white dark:bg-app-dark flex rounded-md flex-col max-w-4xl w-4/5 min-[890px]:w-[375px] items-center">
        <div className="w-full">
          <img src={data.previewLink} alt="project preview" />
        </div>
        <div className="flex adaptive-col-item_24 flex-col w-full p-7 pt-0 items-center">
          <div>
            <h3>{data.name}</h3>
            <p className="adaptive-col-item_8">{data.description}</p>
          </div>
          <div className="flex w-full adaptive-col-item_8">
              <strong className="shrink-0">Tech stack:</strong> <span title={data.techStack.map(item => item.name).join(', ')} className="adaptive-row-item_16 text-overflow_flex">{data.techStack.map(item => item.name).join(', ')}</span>
          </div>
          <div className="flex justify-between adaptive-col-item_8 w-full">
            <a href={data.link} className="flex align-center gap-2">
              <Icon type='link' size={5} color={theme === 'light' ? 'gray-800' : 'zinc-300'}></Icon>
              <span>Live Preview</span>
            </a>
            <a href={data.codeLink} className="flex align-center gap-2">
              <Icon type='gitHub' size={5} color={theme === 'light' ? 'gray-800' : 'zinc-300'}></Icon>
              <span>View Code</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
