import { PageCountParams } from "src/shared/index";
import { CalendarTableFilters } from "../../types";

export interface CalendarTableParams extends PageCountParams {
  filter?: CalendarTableFilters;
};