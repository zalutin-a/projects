import { CalendarCategory } from "./category";


export interface CalendarPromtModel {
  promt: string;
  categories: CalendarCategory[];
  id: string;
}

export interface CalendarPrompts {
  prompts: CalendarPromtModel[];
  pagesCount: number;
}