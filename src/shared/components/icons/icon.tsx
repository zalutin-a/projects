import { forwardRef } from "react";
import { ICON_MAP } from "./icon-map"
import { IconProps } from "./types"

export const Icon = forwardRef<HTMLLIElement, IconProps>(function Icon(props, ref) {
  const {type, onClick = () => {}, className = '', size = 8, color = "gray-400" } = props;
  return (
    <>
      <span onClick={onClick} ref={ref} className={`cursor-pointer inline-block icon icon-size-${size} icon-${color} ${className}`}>
        {ICON_MAP.get(type)}
      </span>
    </>
)
});