import { Icon } from "../index";
import { SocIconsProps } from "./types";

const SOC_ICONS = [ //for development, make call on the first load and put it into state, than use from state
  {
    type: 'gitHub',
    url: '#',
  },
  {
    type: 'linkedin',
    url: '#',
  },
  {
    type: 'facebook',
    url: '#',
  },
  {
    type: 'instagram',
    url: '#',
  }
] as const;

export function SocIcons({size, color='gray-800', direction = 'row'}: SocIconsProps) {
  return (
    <>
      <div className={`flex w-full justify-between flex-${direction}`}>
        {SOC_ICONS.map(icon => <a key={icon.type} href={icon.url} target='_blank'><Icon type={icon.type} {...{size, color}}></Icon></a>)} 
      </div>
    </>
  )
}
