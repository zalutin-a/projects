import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { CalendarPageParamsSlice } from './types'
import { getParamsFromUrl } from 'src/shared/index';

const INITIAL_PAGE = 1;
const INITIAL_ITEM_PRE_PAGE = +localStorage.getItem('countPerPage') || 10;

function getPageParams(): CalendarPageParamsSlice  {
  const params = getParamsFromUrl<any>(window.location.href);
  return {
    page: params.page || INITIAL_PAGE,
    pageSize: params.pageSize || INITIAL_ITEM_PRE_PAGE,
  }
}

export const calendarPageParamsSlice = createSlice({
  name: 'calendarPageParams',
  initialState: <CalendarPageParamsSlice>{
    ...getPageParams(),
  },
  reducers: {
    setPage: (state: CalendarPageParamsSlice, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setItemPerPage: (state: CalendarPageParamsSlice, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    }
  },
})

export const { setPage, setItemPerPage } = calendarPageParamsSlice.actions

export default calendarPageParamsSlice.reducer