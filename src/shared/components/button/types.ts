import { colorsTypes, colorValues } from "src/shared/index";
import { ButtonBaseProps } from "../index";

export type buttonColor = `${colorsTypes}-${colorValues}`

export interface ButtonProps extends ButtonBaseProps {
  color?: buttonColor;
  rounded?: boolean;
  className?: string;
}
