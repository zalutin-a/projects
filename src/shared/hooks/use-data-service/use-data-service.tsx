import { useState, useMemo } from "react";
import { DataServiceBase, FetchService, setFetchLoading } from "src/shared/index";
import { useNavigate } from "react-router-dom";

export function useDataService<C extends DataServiceBase>(dataService: new (setLoadingMap: setFetchLoading, setUrl: (url: string) => void) => C ): FetchService<C> {
  const [loadingMap, setLoadingMap ] = useState(new Map());
  const navigate = useNavigate();
  
  const isLoading = (...methods: any[]): boolean => {
    const a = methods.some((method) => loadingMap.get(method))
    return a
  } 

  const setUrl = (fullUrl: string) => {
    navigate(fullUrl)
  };

  const service = useMemo(() => new dataService(setLoadingMap, setUrl), [])
  console.log('dataservice init')
  return {http: service, isLoading};
}
