import { IconParams } from "../index";

export interface CloseButtonProps extends IconParams{
  clickHandler: () => void;
  className?: string;
}
