import { StateConfig, StoreConfigItem } from "src/shared/index";
import { CategoriesStore } from "./store";

export const categoriesStoreConfig: StateConfig<CategoriesStore, StoreConfigItem> = {
  categories: {
    initValue: () => [],
  }
}
