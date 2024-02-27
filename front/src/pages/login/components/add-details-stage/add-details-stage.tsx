import { useState, SyntheticEvent, useContext} from "react";
import { AppContext } from "src/App";
import { Button, Roles } from "src/shared/index";
import { addDetailsStageProps } from "./types";


export function AddDetailsStage({}: addDetailsStageProps) {
  const { userService } = useContext(AppContext);
  const [name, setName] = useState(userService.user?.displayName || '');
  const [role, setrole] = useState('');
  const onNameChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }
  const onRoleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setrole(e.currentTarget.value)
  }
  const onDone = () => {
    userService.updateProfile({
      displayName: name,
      photoURL: userService.user.photoURL,
      roles: [
        {name: "Visitor", id: Roles.visitor}
      ]
    })
  }

  return (
    <div className="p-14 w-[480px] rounded-2xl bg-white">
      <div className="flex w-full gap-6 items-center flex-col">
        <h1>You’re almost done!</h1>
        <p className="max-w-52 text-center">Share a little more about yourself</p>
        <div className="flex gap-3 w-full flex-col">
          <h3>Display name</h3>
          <input className="px-6 py-3 border-solid border-2 border-gray-600 rounded w-full h-12" onChange={onNameChange} value={name} type="text"/>
          <h3>Desire role</h3>
          <input className="px-6 py-3 border-solid border-2 border-gray-600 rounded w-full h-12" onChange={onRoleChange} value={role} placeholder="e.g. Creator" type="text"/>
          <Button clickHandler={onDone} className="w-full" color='green-300'>Done</Button>
        </div>
      </div>
    </div>
  )
}