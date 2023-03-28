import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { CalendarPageParamsSlice } from './types'
import { parseUrlParams } from 'src/shared/index';
import { CalendarTableParams } from '../../index';

const INITIAL_PAGE = 1;
const INITIAL_ITEM_PRE_PAGE = +localStorage.getItem('countPerPage') || 10;

function getPageParams(): CalendarPageParamsSlice  {
  const params = parseUrlParams<CalendarTableParams>(window.location.href);
  return {
    page: params.page || INITIAL_PAGE,
    itemPerPage: params.itemPerPage || INITIAL_ITEM_PRE_PAGE,
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
      state.itemPerPage = action.payload;
    }
  },
})

export const { setPage, setItemPerPage } = calendarPageParamsSlice.actions

export default calendarPageParamsSlice.reducer