import { ReactNode } from "react";

export interface ButtonBaseProps {
  clickHandler: () => void;
  children?: ReactNode;
  className?: string;
}
