import { Dropdown } from "src/shared/index";
import { calendarDateFilter } from "../index";
import { DateFilterProps } from "./types";

const DATE_FILTER_OPTIONS = [
  {
    name: 'All',
    value: null,
  },
  {
    name: 'With Assigned Date',
    value: calendarDateFilter.withDate,
  },  {
    name: 'Without Assigned Date',
    value: calendarDateFilter.withoutDate,
  },
]

export function DateFilter({onFilterChange, selected, className = ""}: DateFilterProps) {  
  const onChange = (selectedCategories: calendarDateFilter[]) => {
    onFilterChange({type: 'date', payload: selectedCategories[0]})
  }

  return (
    <>
      <div className={`${className} flex justify-between flex-wrap items-center gap-2 w-[420px]`}>
        <span>Filter by assigned date: </span>
        <Dropdown<calendarDateFilter> onSelect={onChange} selectedVlues={[+selected]} options={DATE_FILTER_OPTIONS} placeholder="All"></Dropdown>
      </div>
    </>
  )
}