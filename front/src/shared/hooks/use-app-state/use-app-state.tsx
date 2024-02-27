import { useSearchParams } from "react-router-dom";
import { useMemo, useCallback } from "react";
import { State, filterEmptyValues, stateDispatch, StateConfigItem, StateConfig } from "src/shared/index";


function validateValue(value: any, config: StateConfigItem) {
  if(!value || value === 'null') {
    return null
  }
  const parsedValue = typeof value === 'string' ? config.parse(value) : value;
  return config.validator(parsedValue) ? parsedValue : null;
}

function transformValue(value: any, config: StateConfigItem, state){
  if(config.transform) {
    return config.transform(value, state);
  }
  return value;
}

function applyConfigActions(config: StateConfigItem, value: any, state){
  const validValue = validateValue(value, config);
  const transformendValue = transformValue(validValue, config, state);
  return transformendValue
}


export function useAppState<S>( config: StateConfig<S>): State<S> {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const current: S = useMemo(() => {
    let store = {} as S;
    for (const [key, value] of Object.entries<StateConfigItem>(config)) {
      Object.defineProperty(store, key, {
        get() {
          const param = searchParams.get(key);
          if(!param) {
            return null
          } else {
            const parsedValue = value.parse(param)
            return parsedValue ? parsedValue : null;
          }
        }
      })
    }
    return store;
  }, [searchParams]) //change it maybe use state.current('key')
  

  const dispatch: stateDispatch<S> = useCallback((...actions) => {
    const newParams = new URLSearchParams(searchParams);
    const par = new URLSearchParams()
    for (const action of actions) {
      const param = applyConfigActions(config[action.type], action.payload, current )
      newParams.set(action.type as string, param)
    }
    for (const [key, value] of newParams.entries()) {
      if(key in config) {
        const validParam = validateValue(value, config[key])
        if(filterEmptyValues(validParam) && validParam !== 'null' && validParam !== 'undefined') { //change it
          par.set(key, validParam)
        }
      }
    }
    setSearchParams(par)
  }, [searchParams])

  const returnObject = useMemo(() => {
    return {current, dispatch}
  }, [searchParams])
  
  return returnObject;
}
