import { ReactElement } from "react";
import { ReactNode } from "react";

export interface HoverPopoverProps  {
  children: ReactNode,
  rendredComponent: ReactElement,
  gap?: number;
}