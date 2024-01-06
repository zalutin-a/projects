import { loaderProps } from "./types";

export function Loader({active, children}: loaderProps) {

  return (
    <>
    <div className="relative min-h-screen">
        {!active 
        ? children 
        : (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="loader animate-spin fixed top-2/4"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path className="spiner" d="M18.364 5.636L16.95 7.05A7 7 0 1019 12h2a9 9 0 11-2.636-6.364z" />
          </svg>
        )}
    </div>
    </>
  )
}
