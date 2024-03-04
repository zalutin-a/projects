import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ActionServiceBase, FetchService, redirectFunction, setFetchLoading, } from "src/shared/index";


export function useActionService<C extends ActionServiceBase>(actionService: new (setLoadingMap: setFetchLoading, redirect: redirectFunction) => C ): FetchService<C> {
  const [loadingMap, setLoadingMap ] = useState(new Map());
  const navigate = useNavigate();

  const isLoading = (...methods: any[]): boolean => {
    return methods.some((method) => loadingMap.get(method))
  }

  console.log('Actionservice init')

  const service = useMemo(() => new actionService(setLoadingMap, navigate), [])
  return {http: service, isLoading};
}
