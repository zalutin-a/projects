import { getAuth, signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { Button } from "../index";



export function LoginSignupBtn() {
  const getLink = (type: 'signup' | 'login') => {
    const redirectTo = location.pathname !== '/' && location.pathname !== '/' + type ? '?redirect_to=' + window.location.href : '';
    return `${type}${redirectTo}`
  }
  const auth = getAuth()
  const onSignOut = () => {
    signOut(auth)
  }
  return (
    <>
      {!auth.currentUser 
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