import { ReactElement, ReactNode } from "react";

export type UseModalParams = [component: ReactNode, backdropBlur?: boolean, backdropShadow?: boolean];

export type UseModalReturnType = [
  openModal: () => void,
  modal: ReactElement,
]
