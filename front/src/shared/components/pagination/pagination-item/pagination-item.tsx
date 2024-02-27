import { PaginationItemProps } from "./types";

export function PaginationItem({page, onClick, isActive}:PaginationItemProps) {
  const onPageClick = () => {
    onClick(page);
  }
  
  return (
    <>
      <span className={`${isActive ? 'bg-blue-300' : 'bg-slate-300'} px-1.5 py-1  cursor-pointer box-border dark:text-zinc-700 text-zinc-700`} onClick={onPageClick}>{page}</span>
    </>
  )
}