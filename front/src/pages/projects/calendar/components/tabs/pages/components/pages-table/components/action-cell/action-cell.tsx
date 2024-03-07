import { TableActions, TableCell, tableActionType } from "src/pages/projects/index";
import { UseModal } from "src/shared/index";
import { CommentsModal } from "../../../comments-modal/comments-modal";
import { EditModal } from "../../../edit-modal/index";
import { pagesActionCellProps } from "./types";

export function PagesActinCell({page, index}: pagesActionCellProps) {
  const [ openEditModal, editModal ] = UseModal(<EditModal page={page}></EditModal>);
  const [ openCommentsModal, commentsModal ] = UseModal(<CommentsModal index={index} page={page}></CommentsModal>)

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
      <TableCell x="center">
        <TableActions actions={['edit', 'comment']} onAction={onAction}></TableActions>
      </TableCell>
      {editModal}
      {commentsModal}
    </>
  )
}
