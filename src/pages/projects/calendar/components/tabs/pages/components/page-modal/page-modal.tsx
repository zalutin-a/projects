import { pageModalProps } from "./types";

export function PageModal({page}: pageModalProps) {
  return (
    <>
      <div className="w-[540px]">
        <div>
          <img src={page.img} alt="page image" className="h-full"/>
        </div>
        <div className="bg-white dark:bg-app-dark p-5">
          <div className="flex w-full adaptive-col-item_8">
              <strong className="min-w-[65px]">Holyday:</strong><span className="adaptive-row-item_6">{page.holiday ?? 'No assigned holyday'}</span>
          </div>
          <div className="flex w-full adaptive-col-item_8">
              <strong className="min-w-[65px]">Prompt:</strong><span className="adaptive-row-item_6">{page.prompt?.prompt ?? 'No assigned prompt'}</span>
          </div>
        </div>
      </div>
    </>
  )
}