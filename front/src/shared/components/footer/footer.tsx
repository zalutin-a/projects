import { useContext } from "react";
import { AppContext } from "src/App";
import { FooterLinkItem, SocIcons } from "../index";
import { FoterProps } from "./types";

export function Footer({config}: FoterProps) {
  const { theme } = useContext(AppContext);
  return (
    <>
      <div className="flex justify-center mt-8 py-8 px-2.5 md:px-10 lg:mt-12 lg:pt-16 lg:pb-16 bg-white dark:bg-app-dark">
        <div className="w-full flex flex-col max-w-4xl text-sm font-medium">
          <h4 className="text-app-gray-800 dark:text-app-gray-300">Andrii Zalutin</h4>
          <div className="flex flex-col gap-x-2.5 gap-y-4 lg:flex-row lg:justify-between">
            <div className="mt-4 lg:max-w-lg">  
              <p>This is sample project description random things are here in description This is sample project lorem ipsum generator for dummy content</p>
              <div className="adaptive-col-item_24 max-w-[150px] flex">
                <SocIcons color={theme === 'light' ? 'gray-800' : 'zinc-300'} size={6}></SocIcons>
              </div>
            </div>
            <div className="flex flex-col shrink-0 sm:flex-row sm:gap-x-2.5">
              {config.map(item => <FooterLinkItem key={item.name} config={item}></FooterLinkItem>)}
            </div>
          </div>
          <div className="adaptive-col-item_36">
            Andrii Zalutin 2023. All rights reserved.
          </div>
        </div>
      </div>
    </>
  )
}
