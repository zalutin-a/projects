import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "src/App";
import { ClickPopover } from "../index";
import { Avatar, Button, MenuItem, MenuList, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";



export function LoginSignupBtn() {
  const { userService } = useContext(AppContext);
  const getLink = (type: 'signup' | 'login') => {
    const redirectTo = location.pathname !== '/' && location.pathname !== '/' + type ? '?redirect_to=' + window.location.href : '';
    return `${type}${redirectTo}`
  }

  const onSignOut = () => {
    userService.signOut()
  }
  return (
    <>
      {!userService.user
        ? (
          <>
            <NavLink to={getLink('login')}>
              <Button>Log in</Button>
            </NavLink>
            <NavLink to={getLink('signup')}>
              <Button>Sign up</Button>
            </NavLink>
          </>
        )
        : (
          <ClickPopover rendredComponent={(
            <Paper>
              <MenuList>
                <MenuItem><Link to='/profile'>My account</Link></MenuItem>
                <MenuItem onClick={onSignOut}>Logout</MenuItem>
              </MenuList>
            </Paper>
          )}>
            <Avatar

              sx={{ 
                bgcolor: grey[300],
                cursor: 'pointer',
              }}
              alt="User"
              src="/images/avatar.jpg" //userService.getUserPhoto()
            >
              {userService.userShort.name[0]}
            </Avatar>
          </ClickPopover>
        )
    }

    </>
  )
}