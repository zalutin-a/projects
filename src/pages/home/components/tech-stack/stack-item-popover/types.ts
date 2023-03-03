import { ReactNode } from "react";

import { TechStackItem } from "src/shared/models/tech-stack-item.model";

export interface StackItemPopoverProps {
  children: ReactNode;
  data: TechStackItem;
}
