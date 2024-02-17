import { setFunction } from "./set-function";

export type setLoadingState = (state: boolean) => void;
export type setFetchLoading = setFunction<Map<any, boolean>>;

export type isLoading = (...methods) => boolean;

export interface FetchService<T> {
  http: T;
  isLoading: isLoading;
}

export interface DataFetchService<T> extends FetchService<T> {
  reloadPageData: () => void;
}
