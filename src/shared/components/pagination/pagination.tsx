import { Dropdown } from "../index";
import { ItemsPerPageInputComponent, PaginationItem } from "./index";
import { PaginationProps } from "./types";

const OPTIONS = [
  {name: '10', value: 10},
  {name: '20', value: 20},
  {name: '30', value: 30},
  {name: '40', value: 40},
  {name: '50', value: 50},
  {name: '80', value: 80},
  {name: '100', value: 100},
];

export function Pagination<D>({onChange, pagesCount, currentPage, currentCountPerPage, calssName = ''}: PaginationProps) {
  const onPageClick = (page) => {
    onChange({page, itemPerPage: currentCountPerPage});
  }

  const getPages = () => {
    const pages = [];
    for(let i = 1; i <= pagesCount; i++) {
      pages.push(<PaginationItem isActive={i === currentPage} key={`page${i}`} onClick={onPageClick} page={i}></PaginationItem>);
    }
    return pages;
  }

  const onPageCountChange = (value: number[]) => {
    onChange({page: 1, itemPerPage: value[0]});
  }

  return (
    <>
      <div className={`${calssName} flex gap-2 w-fit`}>
        {getPages()}
        <Dropdown width={125} onSelect={onPageCountChange} options={OPTIONS} selectedVlues={[currentCountPerPage]}>
          <ItemsPerPageInputComponent width={125}></ItemsPerPageInputComponent>
        </Dropdown>
      </div>
    </>
  )
}