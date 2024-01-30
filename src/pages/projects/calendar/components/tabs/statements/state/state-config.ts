import { StateConfig } from "src/shared/index";
import { StatementsState } from "./state";

export const statementsStateConfig: StateConfig<StatementsState> = {
  page: {
    validator: (value) => !isNaN(+value),
    parse: (value) => +value,
  },
  pageSize: {
    validator: (value) => !isNaN(+value),
    parse: (value) => +value,
  },
  date: {
    validator: (value: string) => {
      return !isNaN(+value);
    },
    parse: (value) => +value,
  },
  category: {
    validator: (value: number[]) => {
      return value.every(item => !isNaN(+item));
    },
    parse: (value) => {
      return value.split(',').map(item => +item)
    }
  }
}
