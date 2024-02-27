import { configureStore } from '@reduxjs/toolkit'
import pageParamsReduser from './calendar-page-params-slice/calendar-page-params-slice';
import filterReduser from './calendar-filter-slice/calendar-filter-slice';
import calendarDataReduser from './calendar-data-slice/calendar-data-slice';

export const store = configureStore({
  reducer: {
    calendarPageParams: pageParamsReduser,
    calendarFilter: filterReduser,
    calendarData: calendarDataReduser,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch