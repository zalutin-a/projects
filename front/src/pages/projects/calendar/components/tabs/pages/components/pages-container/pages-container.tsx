import { useState } from "react";
import { PagesCalendar, PagesTable } from "../index";
import { pagesContainerProps } from "./types";

export function PagesContainer({viewMode}: pagesContainerProps) {
  
  const getContent = () => viewMode === 'list' ? <PagesTable></PagesTable> : <PagesCalendar></PagesCalendar>;
  
  return (
    <>
      <div className="">
        {getContent()}
      </div>
    </>
  )
}