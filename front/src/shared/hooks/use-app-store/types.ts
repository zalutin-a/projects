import { Action } from "src/shared/index";

export type storeDispatch<T> = React.Dispatch<Action<keyof T>>;
