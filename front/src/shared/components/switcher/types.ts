import { ReactNode } from "react";

export type switcherValues = [any, any];

export interface SwitcherProps {
  onToggle?: (value: any) => void;
  values?: switcherValues;
  isChecked?: boolean;
  children?: ReactNode;
}