import { useEffect, useState } from "react";

import { PageCountParams, Pagination, paginationReducer } from "src/shared/index";


export function usePagination(params: PageCountParams, reducer: paginationReducer,) {
  const [pagesCount, setPagesCount] = useState<number>(params.page || 1);

  useEffect(() => {
    reducer({page: params.page > pagesCount ? pagesCount : params.page, itemPerPage: params.itemPerPage});
  }, [pagesCount]);

  const getPagination = () => {
    return <Pagination onChange={reducer} pagesCount={pagesCount} currentPage={params.page} currentCountPerPage={params.itemPerPage}></Pagination>
  }

  return {pagination: getPagination(), setPagesCount}
}
