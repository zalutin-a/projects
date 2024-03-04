import { IdName, TechStackItemShort } from "../index";

export interface ProjectItem extends IdName {
  description: string;
  techStack: TechStackItemShort[];
  link: string;
  codeLink: string;
  previewLink: string;
}
