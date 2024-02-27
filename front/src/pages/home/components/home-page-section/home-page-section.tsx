import { ReactNode } from "react";

export function HomePageSection({ children }: {children: ReactNode}) {
  return (
    <>
      <div className="px-2.5 md:px-10 flex justify-center">
        {children}
      </div>
    </>
  )
}
