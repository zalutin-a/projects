import { useState } from "react";
import { UseModal } from "src/shared/index";
import { CommentsModal } from "../../../comments-modal/comments-modal";
import { EditModal } from "../../../edit-modal/edit-modal";
import { PageModal } from "../../../page-modal/page-modal";
import { pagesCalendarItemProps } from "./types";
import { TableActions, tableActionType } from "src/pages/projects/calendar/components/table-actions";

export function PagesCalendarItem({page, index}: pagesCalendarItemProps) {
  const [iconsVisible, setIconsVisible ] = useState(false)
  const [ openPageModal, pageModal ] = UseModal(<PageModal page={page}></PageModal>);
  const [ openCommentsModal, commentsModal ] = UseModal(<CommentsModal index={index} page={page}></CommentsModal>);
  const [ openEditModal, editModal ] = UseModal(<EditModal page={page}></EditModal>);

  const onAction = (type: tableActionType) => {
    switch (type) {
      case 'edit':
        openEditModal();
        break;
      case 'comment':
        openCommentsModal();
        break;
    }
  }

  return (
    <>
      <div>
      <div onMouseOver={() => setIconsVisible(true)} onMouseLeave={() => setIconsVisible(false)} className="bg-white dark:bg-app-dark flex rounded-md flex-col items-center"> 
      {/* max-w-4xl w-11/12 min-[890px]:w-[220px] */}
        <div onClick={openPageModal} className="cursor-pointer w-full h-[200px] z-10">
          <img className="object-cover w-full h-full" src={page.img || "/images/blank-image.jpg"} alt="page preview" />
        </div>
        <div className="flex adaptive-col-item_10 flex-col w-full p-4 pt-0 items-center">
          <div className="relative flex justify-between gap-4 adaptive-col-item_8 w-full">
            <div className="flex justify-center grow">
              <h3 className="text-4xl">{page.date}</h3>
            </div>
            <div className={`${iconsVisible ? 'translate-y-[45px] visible z-20' : 'invisible'} z-0 transition-all absolute -top-[40px] -right-[15px] flex gap-1`}>
              <TableActions actions={['edit', 'comment']} onAction={onAction}></TableActions>
            </div>
          </div>
          <div className="flex w-full adaptive-col-item_8">
              <strong className="shrink-0">Holiday:</strong> <span title={page.holiday ?? 'No assigned holiday'} className="adaptive-row-item_6 text-overflow_flex">{page.holiday ?? 'No assigned holiday'}</span>
          </div>
          <div className="flex w-full adaptive-col-item_8">
              <strong className="shrink-0">Statement:</strong> <span title={page.statement?.value ?? 'No assigned statement'} className="adaptive-row-item_6 text-overflow_flex">{page.statement?.value ?? 'No assigned statement'}</span>
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
