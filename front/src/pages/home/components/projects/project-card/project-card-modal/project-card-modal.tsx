import { BackdropComponent } from "src/shared/index";
import { ProjectCardModalProps } from "./types";

export function ProjectCardModal({imgSrc, closeModal}: ProjectCardModalProps) {
  return (
    <>
      <BackdropComponent closeModal={closeModal}>
        <div className="my-20 px-5">
          <img src={imgSrc} alt="project preview" />
        </div>
      </BackdropComponent>
    </>
  )
}
