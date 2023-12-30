import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { CalendarCategoryModel, CalendarStatementModel } from 'src/shared/index';
import { CalendarDataSlice } from './types'

//todo to delete ?
export const calendarDataSlice = createSlice({
  name: 'calendarData',
  initialState: {
    statements: [] as CalendarStatementModel[],
    categories: [] as CalendarCategoryModel[],
  },
  reducers: {
    setStatements: (state: CalendarDataSlice, action: PayloadAction<CalendarStatementModel[]>) => {
      state.statements = action.payload;
    },
    setCategories: (state: CalendarDataSlice, action: PayloadAction<CalendarCategoryModel[]>) => {
      state.categories = action.payload;
    },
  },
})

export const { setStatements, setCategories } = calendarDataSlice.actions

export default calendarDataSlice.reducer