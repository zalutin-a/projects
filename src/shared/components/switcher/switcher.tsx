import { useState } from 'react';

import { SwitcherProps } from './types';

export function Switcher({values = [false, true], onToggle, isChecked, children}: SwitcherProps) {
  const [ isCheck, setIsCheck ] = useState(isChecked);

  const onClick = (event) => {
    setIsCheck(event.target.checked);
    onToggle(values[event.target.checked ? 1 : 0]);
  }
  
  return (
    <span>
      <input onChange={onClick} defaultChecked={isCheck} type="checkbox" id="scales" className='hidden'></input>
      <label htmlFor="scales" className='flex items-center cursor-pointer'>{children}</label>
    </span>
  )
}