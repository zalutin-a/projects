import { useContext } from "react";

import { AppContext } from "src/App";
import { ButtonBase, Icon, UseModal } from "src/shared";
import { ProjectCardModal } from "../index";
import { ProjectCartProps } from "./types";


export function ProjectCard({data}: ProjectCartProps) {
  const { theme } = useContext(AppContext);
  const { openModal, modal  } = UseModal(<ProjectCardModal imgSrc={data.previewLink}></ProjectCardModal>)
  return (
    <>
      <div className="bg-white dark:bg-app-dark flex rounded-md flex-col max-w-4xl w-11/12 min-[890px]:w-[375px] items-center">
        <div className="w-full">
          <ButtonBase clickHandler={openModal}><img src={data.previewLink} alt="project preview" /></ButtonBase>
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
      {modal}
    </>
  )
}
