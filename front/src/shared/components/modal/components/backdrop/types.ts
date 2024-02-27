import { ReactNode } from "react";

export type backdropComponentProps = {
  children: ReactNode;
  closeModal: () => void;
  backdropBlur?: boolean;
  backdropShadow?: boolean;
  showButton?: boolean;
  beforeClose?: () => boolean;
}