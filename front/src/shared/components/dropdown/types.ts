import { SyntheticEvent } from "react";
import { MutableRefObject } from "react";
import { ReactNode } from "react";
import { ReactElement } from "react";
import { ValueName } from "src/shared/index";

export interface DropdownItemProps<D> extends ValueName<D> {
  onClick: (value: D) => void;
  selected: boolean;
  children?: ReactElement<any & {name: string, selcted: boolean}>;
}

export interface DropdownInputProps<D> {
  children?: ReactNode;
  className?: string;
  ref?: MutableRefObject<Element>,
  onClick?:  (e: SyntheticEvent) => void,
  isOpen?: boolean,
  selectedVlues?: D[];
  width?: number;
  placeholder?: string;
  disable?: boolean;
}

export interface DropdownProps<D> {
  onSelect: (value: D[]) => void;
  isMultiple?: boolean;
  options: ValueName<D>[];
  selectedVlues?: D[];
  children?: ReactElement<DropdownInputProps<D>>;
  itemComponent?: ReactElement<DropdownItemProps<D>>;
  width?: number;
  placeholder?: string;
  disable?: boolean;
}
