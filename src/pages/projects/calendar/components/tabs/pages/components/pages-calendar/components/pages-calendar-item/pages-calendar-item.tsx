import { useContext, useState } from "react";
import { AppContext } from "src/App";
import { Hint, HoverPopover, Icon, UseModal } from "src/shared/index";
import { CommentsModal } from "../../../comments-modal/comments-modal";
import { EditModal } from "../../../edit-modal/edit-modal";
import { PageModal } from "../../../page-modal/page-modal";
import { pagesCalendarItemProps } from "./types";

export function PagesCalendarItem({page}: pagesCalendarItemProps) {
  const [iconsVisible, setIconsVisible ] = useState(false)
  const [ openPageModal, pageModal ] = UseModal(<PageModal page={page}></PageModal>);
  const [ openCommentsModal, commentsModal ] = UseModal(<CommentsModal page={page}></CommentsModal>);
  const [ openEditModal, editModal ] = UseModal(<EditModal page={page}></EditModal>);

  const { theme } = useContext(AppContext);

  return (
    <>
      <div>
      <div onMouseOver={() => setIconsVisible(true)} onMouseLeave={() => setIconsVisible(false)} className="bg-white dark:bg-app-dark flex rounded-md flex-col items-center"> 
      {/* max-w-4xl w-11/12 min-[890px]:w-[220px] */}
        <div onClick={openPageModal} className="cursor-pointer w-full h-[200px] z-10">
          <img className="object-cover w-full h-full" src={page.img || "/images/blank-image.jpg"} alt="project preview" />
        </div>
        <div className="flex adaptive-col-item_10 flex-col w-full p-4 pt-0 items-center">
          <div className="relative flex justify-between gap-4 adaptive-col-item_8 w-full">
            <div className="flex justify-center grow">
              <h3 className="text-4xl">{page.date}</h3>
            </div>
            <div className={`${iconsVisible ? 'translate-y-[45px] visible' : 'invisible'} z-0 transition-all absolute -top-[40px] left-[105px] flex gap-1`}>
              <HoverPopover rendredComponent={<Hint message="Edit Page"></Hint>}>
                <Icon onClick={openEditModal} type='edit' size={5} color={theme === 'light' ? 'gray-800' : 'zinc-300'}></Icon>
              </HoverPopover>
              <HoverPopover rendredComponent={<Hint message="Comments"></Hint>}>
                <Icon onClick={openCommentsModal} type='document' size={5} color={theme === 'light' ? 'gray-800' : 'zinc-300'}></Icon>
              </HoverPopover>
            </div>
          </div>
          <div className="flex w-full adaptive-col-item_8">
              <strong className="shrink-0">Holyday:</strong> <span title={page.holiday ?? 'No assigned prompt'} className="adaptive-row-item_6 text-overflow_flex">{page.holiday ?? 'No assigned holydayI'}</span>
          </div>
          <div className="flex w-full adaptive-col-item_8">
              <strong className="shrink-0">Prompt:</strong> <span title={page.prompt?.prompt ?? 'No assigned prompt'} className="adaptive-row-item_6 text-overflow_flex">{page.prompt?.prompt ?? 'No assigned prompt'}</span>
          </div>
        </div>
      </div>
      {editModal}
      {commentsModal}
      {pageModal}
      </div>
    </>
  )
}