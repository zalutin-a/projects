import { useRef, useState } from "react";
import { ActionServiceBase, setFunction } from "src/shared/index";


export function useActionService<C extends ActionServiceBase>(actionService: new (setIsLoading: setFunction<boolean>) => C ): [service: C, isLoading: boolean] {
  const [isLoading, setIsLoading ] = useState(false);
  const service = useRef(null);
  if (!service.current) {
    service.current = new actionService(setIsLoading);
  }

  return [service.current, isLoading];
}
