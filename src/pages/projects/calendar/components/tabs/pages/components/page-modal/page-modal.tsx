import { pageModalProps } from "./types";

export function PageModal({page}: pageModalProps) {
  return (
    <>
      <div className="w-[540px]">
        <div>
          <img src={page.img || "/images/blank-image.jpg"} alt="page image" className="h-full"/>
        </div>
        <div className="bg-white dark:bg-app-dark p-5">
          <div className="flex w-full adaptive-col-item_8">
              <strong className="min-w-[65px]">Holiday:</strong><span className="adaptive-row-item_6">{page.holiday ?? 'No assigned holiday'}</span>
          </div>
          <div className="flex w-full adaptive-col-item_8">
              <strong className="min-w-[65px]">Statement:</strong><span className="adaptive-row-item_6">{page.statement?.value ?? 'No assigned statement'}</span>
          </div>
        </div>
      </div>
    </>
  )
}
