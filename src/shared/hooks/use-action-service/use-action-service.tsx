import { useState, useMemo } from "react";
import { ActionServiceBase, FetchService, setFetchLoading, } from "src/shared/index";


export function useActionService<C extends ActionServiceBase>(actionService: new (setLoadingMap: setFetchLoading) => C ): FetchService<C> {
  const [loadingMap, setLoadingMap ] = useState(new Map());
  
  const isLoading = (...methods: any[]): boolean => {
    return methods.some((method) => loadingMap.get(method))
  } 

  console.log('Actionservice init')

  const service = useMemo(() => new actionService(setLoadingMap), [])
  return {http: service, isLoading};
}
