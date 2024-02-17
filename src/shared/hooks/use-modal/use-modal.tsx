import ReactDOM from 'react-dom';
import { useState, useRef, ReactElement } from "react";

import { ModalWindow } from "src/shared/index";
import { UseModalParams, UseModalReturnType } from "./types";


export function UseModal(...[component, backdropBlur, backdropShadow]: UseModalParams): UseModalReturnType {
  const [isOpen, setIsOpen] = useState(false);
  const children = component as ReactElement;
  const modalPortal = useRef(document.getElementById('app'));

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  let modal = null;

  if(modalPortal.current && isOpen) {
    modal = ReactDOM.createPortal(
      <ModalWindow {...{children, closeModal, backdropBlur, backdropShadow}}>
        {children}
      </ModalWindow>,
      modalPortal.current
    );
  }

  return [openModal, modal];
}
