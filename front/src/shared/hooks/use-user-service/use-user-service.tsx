import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import { getUserService } from "src/shared";

export function useUserService() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState(() => getUserService().user);
  const [changingState, setChangingState] = useState(null)

  useEffect(() => {
    return getUserService().onUserChanged(() => {
      setSearchParams(searchParams.toString())
    })
  }, [searchParams])

  useEffect(() => {
    return getUserService().onUserChanged((user) => setUser({...user})) as () => void
  }, [])

  useEffect(() => {
    return getUserService().onChangingState((state) => setChangingState(state)) as () => void
  }, [])

  return useMemo(() => getUserService(), [user, changingState]);
}
