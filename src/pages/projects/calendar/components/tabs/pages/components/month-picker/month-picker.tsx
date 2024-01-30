import { useContext } from "react";
import { MONTHS_MAP, Button, Dropdown, months } from "src/shared/index";
import { PagesContext } from "../../pages";
import { monthPickerProps } from "./types";

const monthsMap = Object.entries(MONTHS_MAP).map(([name, value]) => ({name, value}))
const DEFAULT_MONTH = 0

export function MonthPicker({}: monthPickerProps) {
  const { state } = useContext(PagesContext);
  const onMonthSelected = ([value]: months[]) => {
    state.dispatch({type: 'month', payload: value === DEFAULT_MONTH ? null : value});
    // store.dispatch({type: 'id', payload: null}); fix it (need when open just one page) crete separate app-page for showing just one "page"
  }
  return (
    <>
        <div className={`flex justify-between flex-wrap items-center gap-1 w-[360px]`}>
          <span>Select month: </span>
          <Dropdown<months> onSelect={onMonthSelected} selectedVlues={[state.current.month ?? DEFAULT_MONTH]} options={monthsMap} placeholder="select month"></Dropdown>
        </div>
    </>
  )
}
