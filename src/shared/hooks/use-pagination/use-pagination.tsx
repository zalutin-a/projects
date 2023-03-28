import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { PageCountParams, Pagination, paginationReducers } from "src/shared/index";


export function usePagination(params: PageCountParams, reducers: paginationReducers) {
  const [pagesCount, setPagesCount] = useState<number>(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reducers.setPage(params.page > pagesCount ? pagesCount : params.page));
  }, [pagesCount]);

  const onPaginationChange = (config: PageCountParams) => {
    dispatch(reducers.setItemPerPage(config.itemPerPage));
    dispatch(reducers.setPage(config.page));
  }

  const getPagination = () => {
    return <Pagination onChange={onPaginationChange} pagesCount={pagesCount} currentPage={params.page} currentCountPerPage={params.itemPerPage}></Pagination>
  }

  return {pagination: getPagination(), setPagesCount}
}
