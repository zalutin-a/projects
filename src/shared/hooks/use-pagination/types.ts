import { ActionCreator } from "@reduxjs/toolkit";

export type paginationReducers = {
  setPage: ActionCreator<any>,
  setItemPerPage: ActionCreator<any>,
}
