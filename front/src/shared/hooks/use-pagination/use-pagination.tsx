import { useCallback, useEffect } from "react";

import { PaginationParams, Pagination, State, stateDispatch } from "src/shared/index";

export function usePagination<S extends PaginationParams>(state: State<S>, pagesCount) {

  const onChange: stateDispatch<PaginationParams> = useCallback((...actions) => {
      state.dispatch(...actions);
  },[state])

  return pagesCount ? (
      <Pagination
        onChange={onChange}
        pagesCount={pagesCount}
        currentPage={state.current.page}
        currentPageSize={state.current.pageSize}
      ></Pagination>
    ) : null
}
