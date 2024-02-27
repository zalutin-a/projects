import { useContext } from "react"
import { Navigate, useLocation } from "react-router";
import { AppContext } from "src/App";
import { UserService } from "src/shared/index";
import { LoginStage, AddDetailsStage } from "./index";

const defineStage = (userService: UserService) => {
    if(!userService.user) {
      return "authentication";
    }
    if(!userService.userShort.isRegistrationDone) {
      return "addDetails";
    }
    return "done";
}

export function LoginPage(){
  const location = useLocation()
  const { userService } = useContext(AppContext);

  const stage = defineStage(userService)

  if(stage === "done") {
    const redirectTo = new URLSearchParams(location.search).get('redirect_to')
    let route = "";
    try {
      const url = new URL(redirectTo)
      route = url.pathname + url.search;
    } catch (error) {
      route = "/"
    }
    return <Navigate to={route} replace={true}/>
  }

  return (
    <>
      <div className="flex mt-14 justify-center gap-8">
        {stage === 'authentication' ? <LoginStage></LoginStage> : <AddDetailsStage></AddDetailsStage>}
        <div>
          <img src="/images/login.png" alt="logo" />
        </div>
      </div>
    </>
  )
}
