import { useContext, useEffect } from "react";

import { Button, Loader, useAppState, UseModal } from "src/shared/index";
import { CategoriesState, categoriesStateConfig} from "../../index";
import { CalendarContext } from "../../../index";
import { CategoriesTable, EditModal } from "./components/index";

export function CategoriesTab() {
  const { dataService, actionService } = useContext(CalendarContext);
  const [ state ] = useAppState<CategoriesState>(categoriesStateConfig);
  const [ openEditModal, editModal ] = UseModal(<EditModal isNewMode={true}></EditModal>);
  useEffect(() => {
    dataService.http.getCategories({onSuccess: (data) => state.dispatch({type: 'categories', payload: data})}, {
      page: state.curent.page || 1,
      itemPerPage: state.curent.itemPerPage || 20,
    });
  },[state.curent.page]);  // todo separete data and action services with statements tab

  return (
    <>
      <Loader active={dataService.isLoading || actionService.isLoading}>
        <div className="mx-auto box-content pb-8 mt-8 px-2.5 md:px-10 lg:mt-10 lg:pb-16 max-w-4xl">
          <Button color='blue-400' className="dark:text-zinc-600 mt-8" clickHandler={openEditModal}>Add category</Button>
          <CategoriesTable className="mt-8" data={state.curent.categories}></CategoriesTable>
          {editModal}
        </div>
      </Loader>
    </>
  )
}