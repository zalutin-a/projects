import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { DataServiceBase, DataFetchService, setFetchLoading } from "src/shared/index";

export function useDataService<C extends DataServiceBase>(dataService: new (setLoadingMap: setFetchLoading) => C ): DataFetchService<C> {
  let [searchParams, setSearchParams] = useSearchParams();
  const [loadingMap, setLoadingMap ] = useState(new Map());
  
  const isLoading = (...methods: any[]): boolean => {
    return methods.some((method) => loadingMap.get(method))
  }

  const reloadPageData = () => {
    setSearchParams(searchParams.toString())
  }

  const service = useMemo(() => new dataService(setLoadingMap), [])
  console.log('dataservice init')
  return {http: service, isLoading, reloadPageData};
}
