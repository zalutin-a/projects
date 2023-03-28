import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { CalendarCategoryModel, CalendarPromtModel } from 'src/shared/index';
import { CalendarDataSlice } from './types'


export const calendarDataSlice = createSlice({
  name: 'calendarData',
  initialState: {
    prompts: [] as CalendarPromtModel[],
    categories: [] as CalendarCategoryModel[],
  },
  reducers: {
    setPrompts: (state: CalendarDataSlice, action: PayloadAction<CalendarPromtModel[]>) => {
      state.prompts = action.payload;
    },
    setCategories: (state: CalendarDataSlice, action: PayloadAction<CalendarCategoryModel[]>) => {
      state.categories = action.payload;
    },
  },
})

export const { setPrompts, setCategories } = calendarDataSlice.actions

export default calendarDataSlice.reducer