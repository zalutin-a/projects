import { StateConfig, StoreConfigItem } from "src/shared/index";
import { PagesStore } from "./store";

export const pagesStoreConfig: StateConfig<PagesStore, StoreConfigItem> = {
  pages: {
    initValue: () => [],
  },
  categories: {
    initValue: () => [],
  },
}
