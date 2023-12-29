import { CalendarPromptShortModel } from "./promt";

export interface CalendarPageModel {
  id: string,
  date: number,
  month: number,
  year: number,
  day: number;
  prompt: CalendarPromptShortModel,
  img: string,
  comment: string,
  holiday: string,
}

export interface CalendarPages {
  pages: CalendarPageModel[];
}
