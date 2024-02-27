import { ReactNode } from "react";

export type alignment = 'start' | 'center' | 'end';

export interface TableCellProps {
  children: ReactNode;
  x?: alignment;
  y?: alignment;
}
