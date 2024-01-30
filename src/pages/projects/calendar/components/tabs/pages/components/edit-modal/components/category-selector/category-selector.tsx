import { useContext } from 'react';
import { CategoryItem, PagesContext } from 'src/pages/projects/index';
import { Slider } from 'src/shared/index';
import { categorySelectorProps } from "./types";

export function CategorySelector({onCategorySelect, selectedCategory}: categorySelectorProps) {
  const {categories} = useContext(PagesContext).store.current;

  return (
    <>
      <Slider slidingOffset={2} showArrow={true}>
        {categories?.map(category => {
          return (
            <div key={category.id} className="adaptive-row-item_10 cursor-pointer">
              <CategoryItem active={category.id === selectedCategory} clickHandler={onCategorySelect} category={category}></CategoryItem>
            </div>
          )})}
      </Slider>
    </>
  )
}