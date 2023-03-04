import ReactDOM from 'react-dom';
import { useState, useRef, ReactElement } from "react";

import { ModalWindow } from "src/shared/index";
import { UseModalParams, UseModalReturnObject } from "./types";


export function UseModal(...[component, backdropBlur, backdropShadow]: UseModalParams): UseModalReturnObject {
  const [isOpen, setIsOpen] = useState(false);
  const children = component as ReactElement;
  const modalPortal = useRef(document.getElementById('app'));

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const modal = ReactDOM.createPortal(
    isOpen ? (
      <ModalWindow {...{children, closeModal, backdropBlur, backdropShadow}}>
        {children}
      </ModalWindow>
    )
    : null,
    modalPortal.current
  );

  return {openModal, modal}
}
