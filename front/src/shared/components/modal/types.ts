import { ReactNode } from "react";

export interface ModalWindowProps {
  children: ReactNode;
  closeModal: () => void;
}
