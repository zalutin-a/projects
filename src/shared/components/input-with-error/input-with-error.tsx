import { inputWithErrorProps } from "./types";

export function InputWithError({children, error}: inputWithErrorProps) {
  return (
    <>
      {children}
      {error ? <p className="text-red-400">{error}</p> : null}
    </>
  )
}
