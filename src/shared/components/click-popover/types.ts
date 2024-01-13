import { ReactElement } from "react";
import { ReactNode } from "react";

export interface ClockPopoverProps {
  children: ReactNode,
  rendredComponent: ReactElement,
  gap?: number;
  className?: string;
}
