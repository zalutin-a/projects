import { useContext } from "react";

import { ButtonBase, CalendarCategory, Dropdown, Icon } from "src/shared/index";
import { CategoryItem, StatementsContext } from "../index";
import { CategoryFilterProps } from "./types";


const categoryMaper = item => {
  return {
    value: item.id,
    name: item.name,
  }
}

export function CategoryFilter({onFilterChange, selected, className = ""}: CategoryFilterProps) {  
  const { categories } = useContext(StatementsContext).store.current;

  const mapedCategories = categories?.map(categoryMaper)

  const onChange = (selectedCategories: CalendarCategory[]) => {
    onFilterChange({type: 'category', payload: selectedCategories})
  }

  const getSelectedView = () => {
    return selected.length ? (
      <div className="flex flex-wrap items-center gap-2 w-full">
        <span>Selected: </span>
        {selected.map(id => <CategoryItem
          key={id}
          removeHandler={id => onChange(selected.filter(item => item !== id))}
          category={categories.find(cat => cat.id === id)}
          isEditMode={true}
          active={true}></CategoryItem>
        )}
        <ButtonBase className="bg-gray-300 flex items-center font-medium h-fit px-2 py-1 rounded-lg dark:text-zinc-700 text-zinc-700"
          clickHandler={() => onChange([])}
        >
          <span>remove all</span>
          <Icon type='cross' size={5}></Icon>
        </ButtonBase>
      </div>
    )
    : null
  }

  return (
    <>
      <div className={`${className} flex flex-col gap-5`}>
        <div className="flex justify-between flex-wrap items-center gap-2 w-[420px]">
          <span>Filter by Category: </span>
          <Dropdown<CalendarCategory> isMultiple={true} onSelect={onChange} selectedVlues={selected} options={mapedCategories} placeholder="Select categories"></Dropdown>
        </div>
        {getSelectedView()}
      </div>
    </>
  )
}
