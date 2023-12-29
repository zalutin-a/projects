import { StateConfig } from "src/shared/index";

export const pagesStateConfig: StateConfig[] = [
  {
    name: "pages",
    fromUrl: false,
    initValue: [],
  },
  {
    name: "year",
    fromUrl: true,
    initValue: 2024,
    validator: (value) => !isNaN(+value),
  },
  {
    name: "month",
    fromUrl: true,
    initValue: 0,
    validator: (value) => !isNaN(+value),
  },
  // {
  //   name: "filter",
  //   fromUrl: true,
  //   initValue: {},
  // },
]