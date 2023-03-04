import { useRef, SyntheticEvent, ReactElement, cloneElement, useEffect } from 'react';

import { CloseButton } from '../index';
import { ModalWindowProps } from "./types";


export function ModalWindow({children, closeModal, backdropBlur = true, backdropShadow = true}: ModalWindowProps) {
  const modalComponent = children as ReactElement;
  const backdrop = useRef(null);
  const content = useRef(null);

  const onBackdropClick = (e: SyntheticEvent) => {
    if (e.target === backdrop.current) {
      closeModal();
    }
  }

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
    <div className='fixed top-0 left-0 flex justify-center w-screen h-screen bg-black/20 pr-[19px]'> {/*TODO: use global var */}
      <div onClick={onBackdropClick} ref={backdrop} className={`${ backdropBlur ? 'backdrop-blur-sm' : ''} ${backdropShadow ? 'bg-black/20' : ''} modal-container_backdrop flex justify-center items-center relative w-full`}>
        <div ref={content} className='modal-container_content'>
          {cloneElement(modalComponent, {
            ...modalComponent.props,
            closeModal,
          })}
        </div>
        <CloseButton className='absolute right-10 top-5' clickHandler={closeModal}></CloseButton>
      </div>
    </div>
  )
}
