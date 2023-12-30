import { ActionCreatorWithNonInferrablePayload } from "@reduxjs/toolkit";
import { StateConfig } from "src/shared/index";
import { setCalendarFilter, setItemPerPage, setPage } from "./index";



export const calendarStateConfig: StateConfig[] = [
  {
    name: "statements",
    fromUrl: false,
    initValue: [],
    reloadPage: true,
  },
  {
    name: "categories",
    fromUrl: false,
    initValue: [],
    reloadPage: true,
  },
  {
    name: "page",
    fromUrl: true,
    initValue: 1,
    reloadPage: true,
    //@ts-ignore
    reducer: setPage,
    validator: (value) => isNaN(+value) ? false : true,// ? 1: +value,
  },
  {
    name: "itemPerPage",
    fromUrl: true,
    initValue: +localStorage.getItem('countPerPage') || 10,
    reloadPage: true,
    //@ts-ignore
    reducer: setItemPerPage,
    validator: (value) => isNaN(+value) ? false : true,// +localStorage.getItem('countPerPage') || 10 : +value,
  },
  {
    name: "filter",
    fromUrl: true,
    initValue: {},
    reloadPage: true,
    reducer: setCalendarFilter,
  }
];
