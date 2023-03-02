import { SyntheticEvent } from "react";

export function onHoverListener(onMouseEnter: (e: SyntheticEvent) => void, onMouseLeave: (e: SyntheticEvent) => void) {
  return {
    onMouseEnter,
    onMouseLeave,
  }
}