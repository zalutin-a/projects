import { TableCell } from "../../../../index";
import { ActionCell } from "../index";
import { CategoriesTableProp } from "./types";

export function CategoriesTable({data, className}: CategoriesTableProp) {
  return (
    <>
      <div className={`${className} bg-white dark:bg-app-dark`}>
        	<div className={`grid grid-cols-categories font-bold dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500 border-t-2 border-b-2 border-x-2 border-gray-400`}>
            <TableCell x="center">
              <span>ID</span>
            </TableCell>
            <TableCell>
              <span>Category</span>
            </TableCell>
            <TableCell x="center">
              <span>Actions</span>
            </TableCell>
          </div>
        {data.map((item, i) => {
            return (
              <div key={item.id} className={`grid grid-cols-categories border-b-2 border-x-2 border-gray-400`}>
                <TableCell x="center">
                  <span>{item.id}</span>
                </TableCell>
                <TableCell>
                  <span>{item.name}</span>
                </TableCell>
                <ActionCell category={item}></ActionCell>
              </div>
            )
          })}
        </div>
    </>
  )
}
