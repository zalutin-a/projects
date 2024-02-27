import { TableCellProps } from "./types";

export function TableCell({children, x = 'start', y = 'center' }: TableCellProps) {
  return (
    <>
      <div className={`flex justify-${x} items-${y} px-3 py-1.5 border-r-2 last:border-r-0 border-gray-400`}>
        {children}
      </div>
    </>
  )
}