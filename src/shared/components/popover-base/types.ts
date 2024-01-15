import { ReactElement, ReactNode, MutableRefObject } from "react";

export interface PopoverProps  {
  rendredComponent: ReactElement,
  gap?: number;
  outerGap?: number, 
}

export interface HighLevelPopoverProps extends PopoverProps {
  children: ReactNode,
  positionRelative?: boolean;
  className?: string;
}


export interface PopoverBaseProps extends PopoverProps {
  trigger: MutableRefObject<Element>, 
}

export type popoverYPosition = 'top' | 'bottom' | 'middle';
