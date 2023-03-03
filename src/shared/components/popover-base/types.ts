import { MutableRefObject } from "react";
import { ReactElement } from "react";

export interface PopoverBaseProps {
  rendredComponent: ReactElement,
  target: MutableRefObject<any>,
  gap: number,
  outerGap?: number, 
}
