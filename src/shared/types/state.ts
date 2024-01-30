export type Action<T = string, P = any> = {
  type: T,
  payload: P,
}

export type stateDispatch<T> = (...stateActions: Action<keyof T>[]) => void

export interface State<T, D = stateDispatch<T>> {
  current: T,
  dispatch: D,
}

export interface StateConfigItem {
  validator: (value: any) => boolean;
  parse: (value: string) => any;
  transform?: (value: any, state) => any;
}

export type StateConfig<T, C = StateConfigItem> = {
  [key in keyof T]: C;
}
