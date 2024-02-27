import { StackTypeEnum } from "src/shared/index";

const PATH = 'icons/';
const EXTENTION = '.png'

export function useIconPath(type: StackTypeEnum) { 
  return `${PATH}${StackTypeEnum[type]}${EXTENTION}`
}
