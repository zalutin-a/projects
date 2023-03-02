import { IdName, StackTypeEnum } from "../index";

export interface TechStackItemShort extends IdName<StackTypeEnum> {
}

export interface TechStackItem extends TechStackItemShort {
  description: string;
  expertise: number;
  projects: string;
  previewLink: string;
}

