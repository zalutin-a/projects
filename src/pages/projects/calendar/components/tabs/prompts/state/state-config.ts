import { StateConfig } from "src/shared/index";

export const promptsStateConfig: StateConfig[] = [
  {
    name: "prompts",
    fromUrl: false,
    initValue: [],
  },
  {
    name: "categories",
    fromUrl: false,
    initValue: [],
  },
  {
    name: "page",
    fromUrl: true,
    initValue: 1,
    validator: (value) => !isNaN(+value),
  },
  {
    name: "itemPerPage",
    fromUrl: true,
    initValue: +localStorage.getItem('countPerPage') || 10,
    validator: (value) => !isNaN(+value),
  },
  {
    name: "filter",
    fromUrl: true,
    initValue: {},
  },
]