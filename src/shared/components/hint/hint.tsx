import { hintProps } from "./types";

export function Hint({message}: hintProps) {
  return (
    <>
      <div className="px-3 py-2 max-w-xs border border-zinc-400 bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-50">
        <p>{message}</p>
      </div>
    </>
  )
}