import { ActionCreatorWithNonInferrablePayload } from "@reduxjs/toolkit";

export type appReducer =  ActionCreatorWithNonInferrablePayload<`${string}/${string}`>

export interface StateConfig {
  name: string;
  fromUrl: boolean;
  initValue: any;
  reloadPage: boolean;
  reducer?: appReducer; // TODO remove "?"
  validator?: (value: any) => any;
}
