import { useContext } from "react";
import { MONTHS_MAP, Button, Dropdown, months } from "src/shared/index";
import { PagesContext } from "../../pages";
import { monthPickerProps } from "./types";

const monthsMap = Object.entries(MONTHS_MAP).map(([name, value]) => ({name, value}))

export function MonthPicker({}: monthPickerProps) {
  const { state } = useContext(PagesContext);
  const onMonthSelected = ([value]: months[]) => {
    state.dispatch({type: 'month', payload: value})
  }
  return (
    <>
        <div className={`flex justify-between flex-wrap items-center gap-1 w-[360px]`}>
          <span>Select month: </span>
          <Dropdown<months> onSelect={onMonthSelected} selectedVlues={[state.curent.month]} options={monthsMap} placeholder="select month"></Dropdown>
        </div>
    </>
  )
}
