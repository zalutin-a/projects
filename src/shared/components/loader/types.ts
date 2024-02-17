import { ReactNode } from "react";

export type loaderSize = 'small' | 'medium' | 'large';

export type loaderProps = {
  active: boolean;
  children?: ReactNode;
  size?: loaderSize;
}
