export type stateAction<T = string, P = any> = {
  type: T,
  payload: P,
}

export type stateDispatch<T> = React.Dispatch<stateAction<keyof T>>;

export interface State<T> {
  curent: T,
  dispatch: stateDispatch<T>,
}
