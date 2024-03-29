import { setFunction } from "./set-function";

export type setFetchLoading = setFunction<Map<any, boolean>>

export type isLoading = (...methods) => boolean;

export interface FetchService<T> {
  http: T;
  isLoading: isLoading;
}
