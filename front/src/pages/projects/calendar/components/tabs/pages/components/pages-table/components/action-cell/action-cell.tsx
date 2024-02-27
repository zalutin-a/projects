import { useContext } from "react";
import { AppContext } from "src/App";
import { TableCell } from "src/pages/projects/index";
import { ButtonBase, Icon, UseModal } from "src/shared/index";
import { CommentsModal } from "../../../comments-modal/comments-modal";
import { EditModal } from "../../../edit-modal/index";
import { pagesActionCellProps } from "./types";

export function PagesActinCell({page, index}: pagesActionCellProps) {
  const { theme } = useContext(AppContext);
  const [ openEditModal, editModal ] = UseModal(<EditModal page={page}></EditModal>);
  const [ openCommentsModal, commentsModal ] = UseModal(<CommentsModal index={index} page={page}></CommentsModal>)

  const onEditClick = () => {
    openEditModal();
  }

  const onCommentsClick = () => {
    openCommentsModal();
  }

  return (
    <>
      <TableCell x="center">
        <ButtonBase clickHandler={onEditClick}><Icon type='edit' size={6} color={theme === 'light' ? 'gray-800' : 'zinc-300'}></Icon></ButtonBase>
        <ButtonBase clickHandler={onCommentsClick}><Icon type='document' size={6} color={theme === 'light' ? 'gray-800' : 'zinc-300'}></Icon></ButtonBase>
      </TableCell>
      {editModal}
      {commentsModal}
    </>
  )
}
