import { useRef, useState, useMemo } from "react";
import { ActionServiceBase, setFunction } from "src/shared/index";


export function useActionService<C extends ActionServiceBase>(actionService: new (setIsLoading: setFunction<boolean>) => C ): [service: C, isLoading: boolean] {
  const [isLoading, setIsLoading ] = useState(false);
  console.log('Actionservice init')

  const service = useMemo(() => new actionService(setIsLoading), [])
  return [service, isLoading];
}
