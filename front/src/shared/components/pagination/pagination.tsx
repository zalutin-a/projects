import { Dropdown } from "../index";
import { ItemsPerPageInputComponent, PaginationItem } from "./index";
import { PaginationProps } from "./types";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 50;
const OPTIONS = [
  {name: '10', value: 10},
  {name: '20', value: 20},
  {name: '30', value: 30},
  {name: '40', value: 40},
  {name: '50', value: 50},
  {name: '80', value: 80},
  {name: '100', value: 100},
];

export function Pagination({onChange, pagesCount, currentPage, currentPageSize, className = ''}: PaginationProps) {
  const activePage = currentPage ?? DEFAULT_PAGE_NUMBER;
  
  const onPageClick = (page) => {
    onChange({type: 'page', payload: page === DEFAULT_PAGE_NUMBER ? null : page});
  }
  
  const onPageSizeChange = (value: number[]) => {
    onChange({type: 'page', payload: null},{type: 'pageSize',  payload: value[0] === DEFAULT_PAGE_SIZE ? null : value[0]});
  }

  const getPages = () => {
    const pages = [];
    for(let i = 1; i <= pagesCount; i++) {
      pages.push(<PaginationItem isActive={i === activePage} key={`page${i}`} onClick={onPageClick} page={i}></PaginationItem>);
    }
    return pages;
  }

  return (
    <>
      <div className={`${className} flex gap-2 w-fit`}>
        {getPages()}
        <Dropdown width={125} onSelect={onPageSizeChange} options={OPTIONS} selectedVlues={[currentPageSize ?? DEFAULT_PAGE_SIZE]}>
          <ItemsPerPageInputComponent width={125}></ItemsPerPageInputComponent>
        </Dropdown>
      </div>
    </>
  )
}