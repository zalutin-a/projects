export type inputConfig<V = any> = {
  validator?: (value: V) => string,
  transform?: (value: V) => V,
  isRequred?: boolean,
  initialValue: (value?: any) => V,
  isCheckboxOrRadio?: boolean,
}

export interface ControlBase<T,C = any> {
  disabled: boolean,
  isValid: boolean,
  ref: T,
  touched: boolean;
  errorMessage: string,
  setDisabled: (value: boolean) => C,
  reset: () => void;
}

export interface InputControl<V = any> extends ControlBase<HTMLInputElement,InputControl<V>> {
  value: V
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

export type Form<C> = {[name in keyof C]: C[name]}
export type submitCallback<C> = (form: Form<C>) => void;
export type FormValidationError<F> = {message: string, fields: (keyof F)[]}
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
  onSubmit: (callback: submitCallback<C>) => () => void;
  submit: (callback: submitCallback<C>) => void;
  setIsValid: (error: FormValidationError<C> | null) => void;
}
