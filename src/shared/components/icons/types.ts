import { SyntheticEvent } from "react"
import { colorsTypes, colorValues } from "src/shared/index"

export type iconType = 'filter'
  | "calling"
  | 'document'
  | 'graph'
  | 'users'
  | 'themeDay'
  | 'themeNight'
  | 'link'
  | 'gitHub'
  | 'arrowLeft'
  | 'arrowRight'
  | 'menu'

export type iconColor = `${colorsTypes}-${colorValues}` | `hover-${colorsTypes}-${colorValues}`

export type iconSize =
  2  /* 8px */
  | 3 /* 12px */
  | 4 /* 16px */
  | 5 /* 20px */
  | 6 /* 24px */
  | 7 /* 28px */
  | 8 /* 32px */
  | 9 /* 36px */
  | 10 /* 40px */


export interface IconProps {
  type: iconType,
  size?: iconSize,
  color?: iconColor,
  className?: string,
  onClick?: (e: SyntheticEvent) => void,
}
