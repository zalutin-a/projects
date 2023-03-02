import { ReactNode } from "react";

export interface SliderProps {
  children: ReactNode;
  showArrow?: (() => boolean) | boolean;
  slidingOffset?: number; // how many slide will change in 1 click
}