import { useContext } from "react";

import { CalendarCategory } from "src/shared/index";
import { CategoryItem, StatementsContext } from "../index";
import { CategoryFormProps } from "./types";


export function CategoryForm({isEditMode = false, selected = [], setSelected, className = ""}: CategoryFormProps) {
  const { categories } = useContext(StatementsContext).state.curent;
  const onRemoveCategory = (removedCategoryId: CalendarCategory) => {
    setSelected(selected => {
      return selected.filter(id => id !== removedCategoryId);
    } )
  }

  const onAddCategory = (categoryId: CalendarCategory) => {
    setSelected(selected => {
      return [...selected, categoryId];
    } )
  }

  const getContent = () => {
    if (isEditMode) {
      return (
        <div className="flex flex-wrap items-center mt-8 gap-2 w-full">
          <span className="font-medium">Available: </span>{categories.filter(category => !selected.includes(category.id))?.map(category => <CategoryItem key={category.id} clickHandler={onAddCategory} category={category}></CategoryItem>)}
        </div>
      )
    } else {
      return null;
    }
  }

  return (
    <>
      <div className={`${className} ${isEditMode ? "min-h-[255px]" : ""}`}>
        <div className="flex flex-wrap items-center min-h-[32px] gap-2 w-full">
          <span className="font-medium">Selected: </span>{selected.map(id => <CategoryItem key={id} removeHandler={onRemoveCategory} category={categories.find(cat => cat.id === id)} isEditMode={isEditMode} active={true}></CategoryItem>)}
        </div>
        {getContent()}
      </div>
    </>
  )
}