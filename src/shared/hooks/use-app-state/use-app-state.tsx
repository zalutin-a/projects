import { useReducer, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getParamsFromUrl, getQueryParamsFromObj, StateConfig } from "src/shared/index";
import { State, stateAction, stateDispatch } from "./types";

function validateValue<S>(config: StateConfig[], actionName: keyof S, actionValue: any ) {
  const actionConfig = config.find(item => item.name === actionName);
  if (actionConfig?.validator) {
    return actionConfig.validator(actionValue) ? actionValue : actionConfig.initValue;
  }
  return actionValue
}

function initState<S>(config: StateConfig[]): S {
  const state = {} as S;
  const params = getParamsFromUrl<any>(window.location.href);
  config.forEach(item => {
    state[item.name] = item.fromUrl && !!params[item.name] ? validateValue(config, item.name, params[item.name]) : item.initValue;
  });
  return state;
}

export function useAppState<S>(config: StateConfig[]): [State<S>] {
  const navigate = useNavigate();
  const initializer = () => initState<S>(config);
  let location = useLocation();
  console.log('state init')

  const [state, dispatch] = useReducer((state: S, action: stateAction<keyof S>): S => {
    return {...state, [action.type]: validateValue(config, action.type, action.payload) }
  }, null, initializer)

  const urlDependsValues = useMemo(() => config.filter(item => item.fromUrl).map(item => item.name),[config]);

  useEffect(() => {
    const params = {}
    urlDependsValues.forEach(name => params[name] = state[name]);
    navigate('?' + getQueryParamsFromObj(params))
  }, [...urlDependsValues.map(name => state[name]), location.search]);

  return [{curent: state, dispatch}];
}
