import { useState, useEffect, useContext } from "react";
import { useFormControl } from "src/shared/index";
import { loginForm, loginFormProps } from "./types";
import { Button, Chip, InputAdornment, TextField } from "@mui/material";
import { AppContext } from "src/App";
import { loginFormConfig } from "./form-config";
import { LOGIN_FORM_ERRORS } from "./errors-const";


export function LoginForm({type}: loginFormProps) {
  const { userService } = useContext(AppContext);
  const [passwordType, setPaswordType] = useState<"password" | "text">("password");
  const [formControl] = useFormControl<loginForm>(loginFormConfig);

  useEffect(() => {
    formControl.reset()
    return formControl.onSubmit(({email, pass}) => {
      const method = type === 'Log in' ? userService.signInWithPassword.bind(userService) : userService.signUpWithPassword.bind(userService);
      method(email, pass)
        .catch(error => {
          formControl.setIsValid(LOGIN_FORM_ERRORS[error.code]);
        })
   })
  }, [type])

  useEffect(() => {
    if(userService.updatingState !== 'done') {
      formControl.setDisabled(true);
    } else {
      formControl.setDisabled(false);
    }
  }, [userService.updatingState])

  const showHidePassword = () => {
    setPaswordType((type) => {
      return type === "password" ? "text" : "password";
    });
  }

  const resetFormError = () => {
    formControl.setIsValid(null)
  }

  return (
    <>
      <div className="w-full">
        {formControl.errorMessage ? <Chip sx={{borderRadius: '4px'}} label={formControl.errorMessage} variant="outlined" color="error" onDelete={resetFormError} /> : null}
      </div>
      <form {...formControl.registerForm()} className="flex gap-3 w-full flex-col">
        <TextField
          {...formControl.registerInput('email')}
          label="Email"
          variant="outlined"
          fullWidth
          required
          InputProps={{
            type: 'email',
            autoComplete: 'email'
          }}
        />
        <TextField
          {...formControl.registerInput('pass')}
          label="Password"
          variant="outlined"
          fullWidth
          required
          InputProps={{
            type: passwordType,
            endAdornment: (
              <InputAdornment position="end">
                <Button disabled={formControl.children.pass.disabled} color='inherit' onClick={showHidePassword} variant="text">{passwordType === "password" ? "Show" : "Hide"}</Button>
              </InputAdornment>
            )
          }}
        />
          <p className="text-gray-400">Must contain 8+ characters, including at least 1 letter and 1 number.</p>
        <Button fullWidth type="submit" onClick={() => {}} variant='contained' color='success'>{type}</Button>
      </form>
    </>
  )
}