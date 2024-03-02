import { ReactElement, cloneElement, useEffect } from 'react';

import { ModalWindowProps } from "./types";


export function ModalWindow({children, closeModal}: ModalWindowProps) {
  const modalComponent = children as ReactElement;

  const onEscClick = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  const onModalClose = () => {
    window.removeEventListener('keydown', onEscClick)
    document.body.classList.remove('scroll-lock');
  }

  const onModalOpen = () => {
    window.addEventListener('keydown', onEscClick);
    document.body.classList.add('scroll-lock');

    return onModalClose;
  }

  useEffect(onModalOpen);

  return (
    <div aria-modal="true" role="dialog" className='z-40 fixed top-0 left-0 flex justify-center w-screen h-screen bg-black/20'>
      {cloneElement(modalComponent, {
        ...modalComponent.props,
        closeModal,
      })}
    </div>
  )
}
