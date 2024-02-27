import { StateConfig, StoreConfigItem } from "src/shared/index";
import { StatementsStore } from "./store";

export const statementsStoreConfig: StateConfig<StatementsStore, StoreConfigItem> = {
  statements: {
    initValue: () => [],
  },
  statementsCount: {
    initValue: () => 0,
    validator: (value) => !isNaN(+value),
  },
  categories: {
    initValue: () => [],
  },
  pagesCount: {
    initValue: () => null,
    validator: (value) => !isNaN(+value),
  },
}
