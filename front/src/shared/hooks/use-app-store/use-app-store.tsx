import { useReducer, useEffect, useMemo } from "react";
import { State, Action, StateConfig, StoreConfigItem } from "src/shared/index";
import { storeDispatch } from "./types";

function validateValue(value: any, config: StoreConfigItem, state) {
  if (config.validator) {
    return config.validator(value, state) ? value : config.initValue();
  }
  return value;
}

function transformValue(value: any, config: StoreConfigItem, state){
  if(config.transform) {
    return config.transform(value, state);
  }
  return value;
}

function applyConfigActions(config: StoreConfigItem, value: any, state){
  const validValue = validateValue(value, config, state);
  return transformValue(validValue, config, state);
}

function initState<S>(config: StateConfig<S, StoreConfigItem>): S {
  const state = {} as S;
  for (const [key, value] of Object.entries<StoreConfigItem>(config)) {
    state[key] = value.initValue()
  }
  return state;
}

export function useAppStore<S>(config: StateConfig<S, StoreConfigItem>, initialData?: Partial<S>): State<S, storeDispatch<S>> {
  const [state, dispatch] = useReducer((state: S, action: Action<keyof S>): S => {
    return {
      ...state,
      [action.type]: applyConfigActions(config[action.type], action.payload, state)
    }
  }, config, initState)

  useEffect(() => {
    if(initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        if(key in config) {
          dispatch({type: key as keyof S, payload: value});
        } else {
          throw new Error(`Trying to dispatch ${key} value that is not in the curent state. Check the name (${key}) of incoming data`) // TODO: not for prod
        }
      })
    }
  }, [initialData]);

  const stateObject = useMemo(() => {
    return {current: state, dispatch}
  }, [state, dispatch]);

  return stateObject;
}
