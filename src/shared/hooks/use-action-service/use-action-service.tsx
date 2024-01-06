import { useState, useMemo } from "react";
import { ActionServiceBase, FetchService, setFunction } from "src/shared/index";


export function useActionService<C extends ActionServiceBase>(actionService: new (setIsLoading: setFunction<boolean>) => C ): FetchService<C> {
  const [isLoading, setIsLoading ] = useState(false);
  console.log('Actionservice init')

  const service = useMemo(() => new actionService(setIsLoading), [])
  return {http: service, isLoading};
}
