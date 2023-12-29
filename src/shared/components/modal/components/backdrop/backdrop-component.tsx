import { cloneElement, ReactElement, SyntheticEvent, useRef } from "react";
import { CloseButton } from "src/shared/index";
import { backdropComponentProps } from "./types";

export function BackdropComponent({children, closeModal, backdropBlur = true, backdropShadow = true, showButton = true, beforeClose}: backdropComponentProps) {
  const modalComponent = children as ReactElement
  const backdrop = useRef(null);

  const onClose = () => {
    if(!beforeClose || beforeClose()) {
      closeModal();
    }
  }

  const onBackdropClick = (e: SyntheticEvent) => {
    if (e.target === backdrop.current) {
      onClose();
    }
  }

  return (
    <>
      <div onClick={onBackdropClick} ref={backdrop} className={`${ backdropBlur ? 'backdrop-blur-sm' : ''} ${backdropShadow ? 'bg-black/20' : ''} overflow-auto modal-container_backdrop flex justify-center items-start relative w-full`}>
        {cloneElement(modalComponent, {
          ...modalComponent.props,
          closeModal,
        })}
        {showButton ? <CloseButton className='absolute right-10 top-5' clickHandler={onClose}></CloseButton> : null} 
      </div>
    </>
  )
}