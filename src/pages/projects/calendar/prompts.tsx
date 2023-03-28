import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { Button, CalendarPrompts, UseModal, usePagination } from "src/shared/index";
import { CategoryFilter, EditModal, PromtsTable } from "./components";
import { CalendarContext, CalendarTableFilters } from "./index";
import { RootState } from "./store/store";
import { setCalendarFilter,setPage, setItemPerPage, setPrompts, setCategories } from "./store/index";

export function PromptsTab() {
  const {pagination, setPagesCount} = usePagination(useSelector((state: RootState) => state.calendarPageParams), {setPage, setItemPerPage});
  const { dataService, actionService } = useContext(CalendarContext);
  const [ openEditModal, editModal ] = UseModal(<EditModal isNewMode={true}></EditModal>);
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch()

  useEffect(() => {
    dataService.getCategories({onSuccess: (data) => dispatch(setCategories(data))});
  },[]); 

  useEffect(() => {
    dataService.getPrompts(
      {onSuccess: (data: CalendarPrompts) => {
          setPagesCount(data.pagesCount);
          dispatch(setPrompts(data.prompts));
        }
      },
      {...state.calendarPageParams, filter: state.calendarFilter}
    );
  },[state.calendarPageParams, state.calendarFilter]);

  const onFilterChange = (changedFilter: Partial<CalendarTableFilters>) => {
    dispatch(setCalendarFilter(changedFilter))
  }

  return (
    <>
      <div className="mx-auto box-content pb-8 mt-8 px-2.5 md:px-10 lg:mt-10 lg:pb-16 max-w-4xl">
        <div>
          <CategoryFilter onFilterChange={onFilterChange} selected={state.calendarFilter?.category || []}></CategoryFilter>
        </div>
        <Button color='blue-400' className="dark:text-zinc-600 mt-8" clickHandler={openEditModal}>Add prompt</Button>
        <PromtsTable className="mt-8" data={state.calendarData.prompts}></PromtsTable>
        <div className="flex justify-center mt-8">{pagination}</div>
        {editModal}
      </div>
    </>
  )
}