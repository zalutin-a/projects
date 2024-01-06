import { useState, useMemo } from "react";
import { DataServiceBase, FetchService, setFunction } from "src/shared/index";
import { useNavigate } from "react-router-dom";

export function useDataService<C extends DataServiceBase>(dataService: new (setIsLoading: setFunction<boolean>, setUrl: (url: string) => void) => C ): FetchService<C> {
  const [isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();
  const setUrl = (fullUrl: string) => {
    navigate(fullUrl)
  };

  const service = useMemo(() => new dataService(setIsLoading, setUrl), [])
  console.log('dataservice init')
  return {http: service, isLoading};
}
