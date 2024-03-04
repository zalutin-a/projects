import { useRef, cloneElement } from "react";
import { DropdownInput, useClickHandler } from "src/shared/index";
import { DropdownItem } from "./dropdown-item/dropdow-item";
import { DropdownProps } from "./types";

export function Dropdown<D>({onSelect, children, options, itemComponent = null, selectedVlues = [], isMultiple = false, width = 237, placeholder, disable = false }: DropdownProps<D>) {
  const itemRef = useRef(null);
  const listRef = useRef(null);
  const [ openState, updateOpenState ] = useClickHandler((e) => {
    if(isMultiple) {
      if (listRef.current?.contains(e.target)) {
        return false;
      } else {
        return true
      }
    } else { 
      return true
    }
  })

  const getSelectedNames = () => {
    return selectedVlues.map(value => options.find(item => item.value === value)?.name);
  }
  
  const onOptionClick = (value: D) => {
    let selected = [];
    if (isMultiple) {
      const selectedSet = new Set(selectedVlues);
      selectedSet.has(value) ? selectedSet.delete(value) : selectedSet.add(value);
      selected = Array.from(selectedSet.values());
    } else {
      if(value === selectedVlues[0]) {
        return
      }
      selected = [value];
    }
    onSelect(selected);
  }

  const menuPosition = {
    top: itemRef.current?.clientHeight + 10,
    left: -(width / 2) + itemRef.current?.clientWidth / 2,
    width,
  }

  const list = () => {
    return (
      openState
        ? 
          <div style={menuPosition} ref={listRef} className="dropdown-list z-50 absolute">
            <div style={{top: -20, left: (width / 2) - (10)}} className="w-0 h-0 border-[10px] border-transparent border-b-gray-300 absolute"></div>
            <ul role="listbox" id="select-dropdown" className={`flex text-left w-max min-w-full max-h-72 overflow-y-scroll flex-col`}>
              {options.map(option => {
                return <DropdownItem
                    key={option.name}
                    value={option.value}
                    name={option.name}
                    onClick={onOptionClick}
                    selected={selectedVlues.includes(option.value)}
                  >
                    {itemComponent}
                  </DropdownItem>
                })
              }
            </ul>
          </div>
        : <></>
    )
  }

  const value = children ? 
    cloneElement(
      children,
      {
        className: (children.props?.className ?? '') + ' dropdown-trigger relative ' + `dropdown-trigger_${openState ? 'open' : 'close'}`,
        ref: itemRef,
        onClick: updateOpenState,
        children: [children.props.children, list()],
        isOpen: openState,
        selectedVlues,
      }
    ) 
    : 
    <DropdownInput className="relative" disable={disable} ref={itemRef} onClick={updateOpenState} isOpen={openState} selectedVlues={getSelectedNames()} width={width} placeholder={placeholder}>
      {list()}
    </DropdownInput>

  return (
    <>
      {value}
    </>
  )
}