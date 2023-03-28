import { useRef, useState } from "react";
import { DataServiceBase, setFunction } from "src/shared/index";
import { useNavigate } from "react-router-dom";

export function useDataService<C extends DataServiceBase>(dataService: new (setIsLoading: setFunction<boolean>, setUrl: (url: string) => void) => C ): [service: C, isLoading: boolean] {
  const [isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();
  const setUrl = (fullUrl: string) => {
    navigate(fullUrl)
  };
  
  const service = useRef(new dataService(setIsLoading, setUrl))

  return [service.current, isLoading];
}
