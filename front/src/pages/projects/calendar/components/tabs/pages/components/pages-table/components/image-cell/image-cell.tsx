import { TableCell } from "src/pages/projects/index";
import { UseModal } from "src/shared/index";
import { PageModal } from "../../../page-modal/page-modal";
import { pagesImageCellProps } from "./types";

export function PagesImageCell({page}: pagesImageCellProps) {
  const [ openPageModal, pageModal ] = UseModal(<PageModal page={page}></PageModal>);

  return (
    <>
      <TableCell x="center">
        <div onClick={openPageModal} className="cursor-pointer w-full h-full max-h-[200px] z-10">
          <img className="object-cover w-full h-full" src={page.img || "/images/blank-image.jpg"} alt="page preview" />
        </div>
      </TableCell>
      {pageModal}
    </>
  )
}
