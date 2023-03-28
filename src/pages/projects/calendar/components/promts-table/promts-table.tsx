import { Button, CalendarCategory, UseModal } from "src/shared/index";
import { ActionCell, CategoryItem, EditModal, TableCell } from "../index";
import { PromtsTableProp } from "./types";

export function PromtsTable({data, className}: PromtsTableProp) {
  return (
    <>
      <div className={`${className} bg-white dark:bg-app-dark`}>
        	<div className={`grid grid-cols-promts font-bold dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500 border-t-2 border-b-2 border-x-2 border-gray-400`}>
            <TableCell x="center">
              <span>№</span>
            </TableCell>
            <TableCell>
              <span>Promt</span>
            </TableCell>
            <TableCell>
              <span>Categories</span>
            </TableCell>
            <TableCell x="center">
              <span>Actions</span>
            </TableCell>
          </div>
        {data.map((item, i) => {
            return (
              <div key={item.id} className={`grid grid-cols-promts border-b-2 border-x-2 border-gray-400`}>
                <TableCell x="center">
                  <span>{i + 1}</span>
                </TableCell>
                <TableCell>
                  <span>{item.promt}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2 w-full">
                    {item.categories.map(cat => <CategoryItem key={cat} id={cat}></CategoryItem>)}
                  </div>
                </TableCell>
                <ActionCell prompt={item}></ActionCell>
              </div>
            )
          })}
        </div>
    </>
  )
}
