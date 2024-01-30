import { createContext } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { Button, DataFetchService, FetchService, Loader, State, storeDispatch, useActionService, useAppStore, useDataService, UseModal } from "src/shared/index";
import { CategoriesActionService, CategoriesDataService, CategoriesStore, categoriesStoreConfig} from "../../index";
import { CategoriesTable, EditModal } from "./components/index";

export type categoriesContext = {
  actionService: FetchService<CategoriesActionService>,
  dataService: DataFetchService<CategoriesDataService>,
  store: State<CategoriesStore, storeDispatch<CategoriesStore>>,
}
export const CategoriesContext = createContext<categoriesContext>({} as categoriesContext)

export function CategoriesTab() {
  const data = useLoaderData()
  const navigation = useNavigation();
  const store = useAppStore<CategoriesStore>(categoriesStoreConfig, data);
  const dataService = useDataService<CategoriesDataService>(CategoriesDataService);
  const actionService = useActionService<CategoriesActionService>(CategoriesActionService);
  const [ openEditModal, editModal ] = UseModal(<EditModal isNewMode={true}></EditModal>);

  return (
    <>
      <CategoriesContext.Provider value={{store, dataService, actionService}}>
        <div className="min-h-[65svh]">
          <Loader active={navigation.state !== 'idle' || dataService.isLoading(dataService.http.getCategories)}>
            <div className="mx-auto box-content pb-8 mt-8 px-2.5 md:px-10 lg:mt-10 lg:pb-16 max-w-4xl">
              <Button color='blue-400' className="dark:text-zinc-600 mt-8" clickHandler={openEditModal}>Add category</Button>
              <CategoriesTable className="mt-8" data={store.current.categories}></CategoriesTable>
              {editModal}
            </div>
          </Loader>
        </div>
      </CategoriesContext.Provider>
    </>
  )
}
