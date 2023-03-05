import { ProjectCardModalProps } from "./types";

export function ProjectCardModal({imgSrc}: ProjectCardModalProps) {
  return (
    <>
    <div className="px-5">
      <img src={imgSrc} alt="project preview" />
    </div>
    </>
  )
}
