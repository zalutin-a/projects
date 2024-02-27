import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "src/App";
import { Button } from "../index";



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
              <Button clickHandler={() => {}}>Log in</Button>
            </NavLink>
            <NavLink to={getLink('signup')}>
              <Button clickHandler={() => {}}>Sign up</Button>
            </NavLink>
          </>
        )
        : (
          <>
            <Button clickHandler={onSignOut}>Log out</Button>
          </>
        )
    }

    </>
  )
}