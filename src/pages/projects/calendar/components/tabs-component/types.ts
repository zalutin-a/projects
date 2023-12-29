import { ReactNode } from "react";

export interface CalendarTab {
  path: string;
  name: string;
}

export interface TabsProps {
  config: CalendarTab[];
}
