import { useContext, useEffect} from "react";
import { AppContext } from "src/App";
import { FormConfig, Roles, useFormControl } from "src/shared/index";
import { addDetailsForm, addDetailsStageProps } from "./types";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const addDetailsFormConfig: FormConfig<addDetailsForm> = {
  displayName: {
    initialValue: (userDetails) => '',
  },
  photoURL: {
    initialValue: (userDetails) => '',
  },
  roles: {
    initialValue: (userDetails) => null
  }
}
export function AddDetailsStage({}: addDetailsStageProps) {
  const { userService } = useContext(AppContext);
  const [formControl] = useFormControl(addDetailsFormConfig);
  
  useEffect(() => {
    return formControl.onSubmit(({displayName, photoURL, roles}) => {
      userService.updateProfile({
        displayName,
        photoURL: userService.user.photoURL,
        roles: roles ? [roles] : [],
      })
   })
  }, [])

  return (
    <div className="p-14 w-[480px] rounded-2xl bg-white">
      <div className="flex w-full gap-6 items-center flex-col">
        <h1>You’re almost done!</h1>
        <p className="max-w-52 text-center">Share a little more about yourself</p>
        <form {...formControl.registerForm()} className="flex gap-3 w-full flex-col">
          <TextField
            {...formControl.registerInput('displayName')}
            label="Display name"
            variant="outlined"
            fullWidth
            required
            InputProps={{
              type: 'text',
              autoComplete: 'name'
            }}
          />
            <FormControl fullWidth sx={{maxWidth: 550}}>
              <InputLabel id="select-tatement-label">Select Statement</InputLabel>
              <Select
                {...formControl.registerInput('roles')} 
                labelId="select-tatement-label"
                label="Select Statement"
                MenuProps={MenuProps}
              >
                <MenuItem key={'none'} value={null}>None</MenuItem>
                <MenuItem key={Roles.admin} value={Roles.admin}>Admin</MenuItem>
                <MenuItem key={Roles.approver} value={Roles.approver}>Approver</MenuItem>
                <MenuItem key={Roles.editor} value={Roles.editor}>Editor</MenuItem>
                <MenuItem key={Roles.visitor} value={Roles.visitor}>Visitor</MenuItem>
              </Select>
            </FormControl>
            <Button fullWidth type="submit" onClick={() => {}} variant='contained' color='success'>Done</Button>
        </form>
      </div>
    </div>
  )
}