import { loaderProps } from "./types";

export function Loader({active, children, size = 'large'}: loaderProps) {
  return (
    <>
      <div className={`${active ? 'relative min-h-[inherit]' : ''}`}>
        {!active
          ? null
          : (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`loader animate-spin loader_${size}`}
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path className="spiner" d="M18.364 5.636L16.95 7.05A7 7 0 1019 12h2a9 9 0 11-2.636-6.364z" />
            </svg>
          )
        }
        <div className={`${active ? 'invisible absolute w-0 h-0' : ''}`}>
          {children}
        </div>
      </div>
    </>
  )
}
