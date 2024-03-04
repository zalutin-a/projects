import { useEffect, useState, useMemo } from "react"
import { FormConfig, FormControl } from "./types"
import { AppFormControl } from "./form-control";


export function useFormControl<C>(formConfig: FormConfig<C>, initialData: any = null): [FormControl<C>] {
  const [formControl, setFormControl] = useState<AppFormControl<C>>(() => new AppFormControl<C>(formConfig, initialData))
  const [shouldUpdate, setShouldUpdate] = useState({});

  useEffect(() => {
    return formControl?.onFormChange(() => {
      setShouldUpdate({})
    })
  }, [])

  return useMemo(() => {
    return [formControl as FormControl<C>]
  }, [shouldUpdate])
}
