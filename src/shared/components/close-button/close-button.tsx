import { forwardRef } from "react";

import { ButtonBase, Icon } from "../index";
import { CloseButtonProps } from "./types";


export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(function CloseButton(props, ref) {
  const {size, color='hover-gray-300', clickHandler, className} = props;
  return (
    <ButtonBase ref={ref} {...{clickHandler, className}}>
      <Icon type='cross' {...{size, color}}></Icon>
    </ButtonBase>
  )
});
