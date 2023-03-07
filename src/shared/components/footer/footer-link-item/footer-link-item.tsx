import { FooterLinkItemProps } from "./types";

export function FooterLinkItem({config}: FooterLinkItemProps) {
  const getChildren = () => {
    return config.children ? (
      <ul className="pl-3 sm:pl-0 sm:pt-0.5">
        {config.children.map(item => item.children
          ? <li><FooterLinkItem config={item}></FooterLinkItem></li>
          : <a href={item.path}><li>{item.name}</li></a>)}
      </ul>
    )
    : <></>
  }

  return (
    <>
      <div>
        {config.children ? <h6 className="cursor-default  text-app-gray-800 dark:text-app-gray-300">{config.name}</h6> : <a href={config.path}><h6 className="text-app-gray-800 dark:text-app-gray-300">{config.name}</h6></a>}
        {getChildren()}
      </div>
    </>
  )
}
