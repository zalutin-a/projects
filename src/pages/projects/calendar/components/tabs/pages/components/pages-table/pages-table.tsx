import { useContext } from "react"
import { PagesContext, TableCell } from "../../../../index"
import { PagesActinCell, PagesImageCell } from "./components";

export function PagesTable() {
  const { state } = useContext(PagesContext);

  return (
    <>
      <div className={`mt-8 bg-white dark:bg-app-dark`}>
        	<div className={`grid grid-cols-pages font-bold dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500 border-t-2 border-b-2 border-x-2 border-gray-400`}>
            <TableCell x="center">
              <span>Date</span>
            </TableCell>
            <TableCell x="center">
              <span>Image</span>
            </TableCell>
            <TableCell>
              <span>Statement</span>
            </TableCell>
            <TableCell>
              <span>Holiday</span>
            </TableCell>
            <TableCell x="center">
              <span>Actions</span>
            </TableCell>
          </div>
        {state.curent.pages.map((page, i) => {
            return (
              <div key={page.id} className={`grid grid-cols-pages border-b-2 border-x-2 border-gray-400`}>
                <TableCell x="center">
                  <span>{page.date}</span>
                </TableCell>
                <PagesImageCell page={page}></PagesImageCell>
                <TableCell>
                  <span>{page.statement?.value}</span>
                </TableCell>
                <TableCell>
                  <span>{page.holiday}</span>
                </TableCell>
                <PagesActinCell index={i} page={page}></PagesActinCell>
              </div>
            )
          })}
        </div>
    </>
  )
}
