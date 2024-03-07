import { tableActionsProps } from "./types";
import { UIMatch, useMatches } from "react-router-dom";
import { useContext, useMemo } from "react";
import { AppContext } from "src/App";
import { IconButton } from "@mui/material";
import { Hint, HoverPopover, Icon } from "src/shared";

export function TableActions({actions, onAction}: tableActionsProps) {
  const { userService, theme } = useContext(AppContext)
  const matches = useMatches() as UIMatch<any, any>[];
  const permissions = matches.find((item: any) => !!item.handle?.permissions)?.handle.permissions
  const allowedActions = useMemo(() => {
    return actions.filter(action => userService.hasPermission([permissions[action]]))
  }, [userService.user])
  
  return (
    <>
      {
        allowedActions.includes('edit')
          ? (<HoverPopover className="flex" rendredComponent={<Hint message="Edit"></Hint>}>
              <IconButton onClick={() => onAction('edit')} aria-label="edit" size="small">
                <Icon type='edit' color={theme === 'light' ? 'gray-800' : 'zinc-300'} size={6}></Icon>
              </IconButton>
            </HoverPopover>
          )
          : null
      }
      {
        allowedActions.includes('comment')
          ? (<HoverPopover className="flex" rendredComponent={<Hint message="Comment"></Hint>}>
              <IconButton onClick={() => onAction('comment')} aria-label="comment" size="small">
                <Icon type='document' color={theme === 'light' ? 'gray-800' : 'zinc-300'} size={6}></Icon>
              </IconButton>
            </HoverPopover>
          )
          : null
      }
      {
        allowedActions.includes('delete')
          ? (<HoverPopover className="flex" rendredComponent={<Hint message="Delete"></Hint>}>
              <IconButton onClick={() => onAction('delete')} aria-label="delete" size="small">
                <Icon type='cross' color={theme === 'light' ? 'gray-800' : 'zinc-300'} size={6}></Icon>
              </IconButton>
            </HoverPopover>
          )
          : null
      }
    </>
  )
}
