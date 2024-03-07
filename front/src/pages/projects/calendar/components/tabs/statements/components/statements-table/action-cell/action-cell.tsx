import { TableActions, TableCell, tableActionType } from "src/pages/projects/index";
import { UseModal } from "src/shared/index";
import { EditModal } from "../index";
import { DeleteModal } from "./delete-modal/delete-modal";
import { ActionCellProps } from "./types";

export function ActionCell({statement}: ActionCellProps) {
  const [ openEditModal, editModal ] = UseModal(<EditModal statement={statement}></EditModal>);
  const [ openDeleteModal, deleteModal ] = UseModal(<DeleteModal id={statement.id}></DeleteModal>)

  const onAction = (type: tableActionType) => {
    switch (type) {
      case 'edit':
        openEditModal();
        break;
      case 'delete':
        openDeleteModal();
        break;
    }
  }

  return (
    <>
      <TableCell x="center">
        <TableActions actions={['edit', 'delete']} onAction={onAction}></TableActions>
      </TableCell>
      {editModal}
      {deleteModal}
    </>
  )
}