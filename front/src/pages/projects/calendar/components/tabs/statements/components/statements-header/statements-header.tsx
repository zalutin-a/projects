import { useContext } from "react";
import { Action, Button, UseModal, PermissionsEnum } from "src/shared";
import { AppContext } from "src/App";
import { CategoryFilter } from "../../../../category-filter";
import { DateFilter } from "../date-filter";
import { EditModal } from "../statements-table";
import { StatementsState } from "../../state";
import { StatementsContext } from "../../statements";

export function StatementsHeader() {
  const {userService} = useContext(AppContext);
  const {state, store} = useContext(StatementsContext);
  const [ openEditModal, editModal ] = UseModal(<EditModal isNewMode={true}></EditModal>);

  const onFilterChange = (changedFilter: Action<keyof StatementsState, any>) => {
    state.dispatch(changedFilter, {type: 'page', payload: null})
  }

  return (
    <>
      <div className="flex flex-col gap-y-5">
        <DateFilter onFilterChange={onFilterChange} selected={state.current.date}></DateFilter>
        <CategoryFilter onFilterChange={onFilterChange} selected={state.current.category || []}></CategoryFilter>
        <div className="flex items-center mt-8 justify-between">
          <h3>Found {store.current.statementsCount} statement{`${store.current.statementsCount > 1 ? 's' : ''}`}</h3>
          {
            userService.hasPermission([PermissionsEnum.addStatement])
              ? <Button color='blue-400' className="dark:text-zinc-600" clickHandler={openEditModal}>Add statement</Button>
              : null
          }
        </div>
        {editModal}
      </div>
    </>
  )
}
