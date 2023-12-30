import { CalendarStatementModel, Categories, Filter, PageCountParams } from "src/shared/index";
import {  StatementsTableFilters } from "../types";

export interface StatementsState extends PageCountParams, Filter<StatementsTableFilters>, Categories {
  statements: CalendarStatementModel[];
}