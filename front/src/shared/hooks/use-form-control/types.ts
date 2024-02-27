export type inputConfig<V = any> = {
  id: string,
  validator: (value: V) => string,
  transform: (value: V) => V,
  isRequred: boolean,
  initialValue: V,
}

export interface ControlBase<T,C = any> {
  disabled: boolean,
  isValid: boolean,
  ref: T,
  touched: boolean;
  setIsValid: (value: boolean, message?: string) => C,
  setDisabled: (value: boolean) => C,
}

export interface inputControl<V = any> extends ControlBase<HTMLInputElement,inputControl<V>> {
  value: V
  errorMessage: string,
  setValue: (value: V) => inputControl<V>
}


export type FormConfig<C> = {
  [name in keyof C]: inputConfig<C[name]>;
}

export type ChildrenControl<C> = {
  [name in keyof C]: inputControl<C[name]>;
};

export interface FormControl<C> extends ControlBase<HTMLFormElement> {
  children: ChildrenControl<C>,
}


type loginFormConfigType = {
  pass: string,
  email: string,
}

// const a: FormConfig<loginFormConfigType> = {
//   pass: {
//     isRequred: true,
//     id: 'id',
//     validator: (value) => true,
//     transform: (value) => value
//   },
//   email: {
//     isRequred: true,
//     id: 'id',
//     validator: (value) => true,
//     transform: (value) => value
//   }
// }
