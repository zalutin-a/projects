import { StackItemProps } from "../types";
import { useIconPath } from "../use-icon-path/use-icon-path";

export function StackItem({data}: StackItemProps) {
  const iconPath = useIconPath(data.id);
  return (
    <>
      <div style={{backgroundImage: `url(${iconPath})`}} className='w-20 h-20 bg-contain bg-center bg-no-repeat'></div>
    </>
  )
}