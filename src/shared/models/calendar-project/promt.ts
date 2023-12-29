import { CalendarCategory } from "./category";

export interface CalendarPromptShortModel {
  prompt: string;
  id: string;
}

export interface CalendarPromtModel {
  promt: string;
  categories: CalendarCategory[];
  id: string;
  date: string;
  imgSrc: string;
}

export interface CalendarPrompts {
  prompts: CalendarPromtModel[];
  pagesCount: number;
  promptsCount: number;
}