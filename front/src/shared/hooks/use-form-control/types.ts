export type inputConfig<V = any> = {
  id: string,
  validator: (value: V) => string,
  transform: (value: V) => V,
  isRequred: boolean,
  initialValue: V,
  isCheckboxOrRadio?: boolean,
}

export interface ControlBase<T,C = any> {
  disabled: boolean,
  isValid: boolean,
  ref: T,
  touched: boolean;
  setDisabled: (value: boolean) => C,
  reset: () => void;
}

export interface InputControl<V = any> extends ControlBase<HTMLInputElement,InputControl<V>> {
  value: V
  errorMessage: string,
  setValue: (value: V) => InputControl<V>,
  setIsValid: (message?: string) => InputControl<V>,
  validate: () => void;
  onChange: (value: (value: V) => void) => () => void;
}

export type FormConfig<C> = {
  [name in keyof C]: inputConfig<C[name]>;
}

export type ChildrenControl<C> = {
  [name in keyof C]: InputControl<C[name]>;
};

export interface FormControl<C> extends ControlBase<HTMLFormElement> {
  children: ChildrenControl<C>,
  registerInput: (name: keyof C) => {
    inputRef: (e: any) => void,
    onBlur: (e: any) => void,
    onChange: (e: any) => void,
    error: boolean,
    value: C,
    helperText: string,//TODO: to remove?
    name: keyof C,
  },
  registerForm: () => any,
  onSubmit: (value: (value: {[name in keyof C]: C[name]}) => void) => () => void;
}
