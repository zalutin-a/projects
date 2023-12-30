import { Icon } from "src/shared/index";
import { CategoryItemProps } from "./types";

export function CategoryItem({clickHandler, removeHandler, category, className, isEditMode = false, active = false}: CategoryItemProps) {
  const onRemoveClick = () => {
    if (removeHandler) {
      removeHandler(category.id);
    }
  }
  const onClick = () => {
    if (clickHandler) {
      clickHandler(category.id);
    }
  }

  return (
    <>
      <span onClick={onClick} className={`${className ?? ''} ${active ? 'bg-blue-300' : 'bg-slate-300'} ${!active ? 'cursor-pointer' : ''} flex items-center font-medium h-fit px-2 py-1 rounded-lg dark:text-zinc-700 text-zinc-700 text-overflow`}>
        {category.name}
        {isEditMode ? <Icon onClick={onRemoveClick} type='cross' size={5}></Icon> : <></>}
      </span>
    </>
  )
}