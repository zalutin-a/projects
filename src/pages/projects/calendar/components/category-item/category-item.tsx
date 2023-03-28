import { useSelector } from "react-redux";
import { Icon } from "src/shared/index";
import { RootState } from "../../store/store";
import { CategoryItemProps } from "./types";

export function CategoryItem({clickHandler, removeHandler, id, className, isEditMode = false, active = false}: CategoryItemProps) {
  const categories = useSelector((state: RootState) => state.calendarData.categories);
  
  const onRemoveClick = () => {
    if (removeHandler) {
      removeHandler(id);
    }
  }
  const onClick = () => {
    if (clickHandler) {
      clickHandler(id);
    }
  }

  return (
    <>
      <span onClick={onClick} className={`${className ?? ''} ${active ? 'bg-blue-300' : 'bg-slate-300'} ${!active ? 'cursor-pointer' : ''} flex items-center font-medium h-fit px-2 py-1 rounded-lg dark:text-zinc-700 text-zinc-700 text-overflow`}>
        {categories.find(item => item.id === id)?.name}
        {isEditMode ? <Icon onClick={onRemoveClick} type='cross' size={5}></Icon> : <></>}
      </span>
    </>
  )
}