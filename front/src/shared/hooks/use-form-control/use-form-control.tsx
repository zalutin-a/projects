import { useEffect, useState, useMemo, useRef, ReactElement, MutableRefObject } from "react"
import { BehaviorEmitter, Emitter } from "src/shared/index";
import { JsxElement } from "typescript";
import { ChildrenControl, FormConfig, FormControl, inputConfig, inputControl } from "./types"


export function useFormControl<C>(formConfig: FormConfig<C>, onSubmit: (event: Event) => Promise<any>): [control: FormControl<C>, setForm: (element: HTMLFormElement) => void] {
  const [formControl, setFormControl] = useState<AppFormControl<C>>(() => new AppFormControl<C>(formConfig, onSubmit))
  const [shouldUpdate, setShouldUpdate] = useState({});

  useEffect(() => {
    const unSubscribe = formControl?.onFormChange(() => {
      setShouldUpdate({})
    })
    return () => {
      unSubscribe()
      formControl.removeListeners()
    }
  }, [])

  return useMemo(() => {
    return [formControl, (v) => formControl.setForm(v)]
  }, [shouldUpdate])
}

export class AppFormControl<C> implements FormControl<C> {
  children = {} as ChildrenControl<C>;
  isValid: boolean = true;
  disabled: boolean = true;
  touched = false;
  ref: HTMLFormElement = null; 

  private formChange = new BehaviorEmitter({})
  private config: FormConfig<C>;
  private listeners: {input: HTMLInputElement, callback: any}[] = [];
  private submit:(event: Event) => Promise<any>;

  constructor(config: FormConfig<C>, onSubmit:(event: Event) => Promise<any>) {
    this.config = config
    this.submit = onSubmit;
    Object.entries<inputConfig>(config).forEach(item => {
      this.children[item[0]] = new AppInputControl(item[1], (v) => this.formChange.emitValue(v))
    })

  }

  setIsValid(value: boolean, message?: string){
    return this
  };

  setDisabled(value: boolean){
    return this
  };

  onFormChange(callback: (value) => void) {
    return this.formChange.subscribe(callback)
  }

  setForm(element: HTMLFormElement) {
    if(element && this.ref !== element) {
      this.ref = element
      this.ref.addEventListener('submit', this.onSubmit)
      Object.entries<inputConfig>(this.config).forEach(([inputName])=> {
        this.listeners.push(
          this.children[inputName].setInputElement(
            document.getElementById(this.config[inputName].id) as HTMLInputElement
          )
        )
      })
      this.formChange.emitValue({})
    }
  }

  removeListeners() {
    this.listeners.forEach((item) => {
      item.input.removeEventListener('input', item.callback)
    })
  }

  private onSubmit = (event: Event) => {
    this.submit(event);
  }
}

export class AppInputControl<C> implements inputControl<C> {
  ref: HTMLInputElement = null;
  value: any = null;
  isValid: boolean = true;
  disabled: boolean = true;
  errorMessage: string = '';
  touched: boolean = false;
  private config: inputConfig;
  private formChangeEmitter

  constructor(config: inputConfig, formChangeEmitter: (v) => void) {
    this.config = config;
    this.formChangeEmitter = formChangeEmitter;
    this.value = config.initialValue;
  }

  private onChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const transformedValue = this.config.transform(target.value)
    this.value = transformedValue;
    if(this.touched) {
      const error = this.config.validator(this.value);
      this.isValid = !error;
      this.errorMessage = error
      this.ref.setCustomValidity(error)
    }

    this.formChangeEmitter({})
  }

  setValue(value: C) {
    return this as inputControl<C>
  };

  setIsValid(value: boolean, message: string = '') {
    this.isValid = !!value;
    this.errorMessage = message;
    this.ref.setCustomValidity(message);
    this.formChangeEmitter({});
    return this as inputControl<C>
  }


  setDisabled(value: boolean) {
    this.disabled = !!value;
    this.ref.setAttribute('disabled', `${this.disabled}`)
    this.formChangeEmitter({});
    return this as inputControl<C>
  }

  setInputElement(element: HTMLInputElement) {
    this.ref = element;
    this.ref.addEventListener('change', () => {
      this.touched = true;
      const error = this.config.validator(this.value);
      this.isValid = !!error;
      this.errorMessage = error
      this.ref.setCustomValidity(error)
      this.formChangeEmitter({});
    }, {once: true});
    this.ref.addEventListener('input', this.onChange);
    // this.isValid = !!this.config.validator(this.value);
    this.disabled = false;
    return {input: this.ref, callback: this.onChange}
  }

  reset() {

  }
}