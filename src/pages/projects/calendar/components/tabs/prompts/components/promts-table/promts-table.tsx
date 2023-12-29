import { useContext } from 'react'
import { PromtsTableProp } from "./types";
import { ActionCell } from "./action-cell";
import { CategoryItem, PromptsContext, TableCell } from "../../../../index";

export function PromptsTable({data, className}: PromtsTableProp) {
  const { categories } = useContext(PromptsContext).state.curent;

  
  return (
    <>
      <div className={`${className} bg-white dark:bg-app-dark`}>
        	<div className={`grid grid-cols-promts font-bold dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500 border-t-2 border-b-2 border-x-2 border-gray-400`}>
            <TableCell x="center">
              <span>Date</span>
            </TableCell>
            <TableCell>
              <span>Prompt</span>
            </TableCell>
            <TableCell>
              <span>Categories</span>
            </TableCell>
            <TableCell x="center">
              <span>Actions</span>
            </TableCell>
          </div>
        {data?.map((item, i) => {
            return (
              <div key={item.id} className={`grid grid-cols-promts border-b-2 border-x-2 border-gray-400`}>
                <TableCell x="center">
                  <span>{item.date ?? ''}</span>
                </TableCell>
                <TableCell>
                  <span>{item.promt}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2 w-full">
                    {item.categories.map(id => <CategoryItem key={id} category={categories.find(cat => cat.id === id)} ></CategoryItem>)}
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
