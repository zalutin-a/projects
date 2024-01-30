import { StateConfig } from "src/shared/index";
import { PagesState } from "./state";

export const pagesStateConfig: StateConfig<PagesState> = {
  year: {
    validator: (value) => !isNaN(+value),
    parse: (value) => !isNaN(+value),
  },
  month: {
    validator: (value) => !isNaN(+value),
    parse: (value) => +value,
  },
  id: {
    validator: (value) => true,
    parse: (value: string) => value,
  },
}
