import { TableCell } from "src/pages/projects/index";
import { ButtonBase, Icon, UseModal } from "src/shared/index";
import { EditModal } from "../index";
import { DeleteModal } from "./delete-modal/delete-modal";
import { ActionCellProps } from "./types";

export function ActionCell({prompt}: ActionCellProps) {
  const [ openEditModal, editModal ] = UseModal(<EditModal prompt={prompt}></EditModal>);
  const [ openDeleteModal, deleteModal ] = UseModal(<DeleteModal id={prompt.id}></DeleteModal>)

  const onEditClick = () => {
    openEditModal();
  }

  const onDeleteClick = () => {
    openDeleteModal();
  }

  return (
    <>
      <TableCell x="center">
        <ButtonBase clickHandler={onEditClick}><Icon type='edit' size={6}></Icon></ButtonBase>
        <ButtonBase clickHandler={onDeleteClick}><Icon type='cross' size={6}></Icon></ButtonBase>
      </TableCell>
      {editModal}
      {deleteModal}
    </>
  )
}