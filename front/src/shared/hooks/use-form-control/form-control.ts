import { BehaviorEmitter, Emitter } from "src/shared/utils";
import { ChildrenControl, Form, FormConfig, FormControl, InputControl, inputConfig, submitCallback } from "./types";
import { AppInputControl } from "./input-control";

export class AppFormControl<C> implements FormControl<C> {
  children = {} as ChildrenControl<C>;
  disabled: boolean = false;
  touched = false;
  ref: HTMLFormElement = null;
  errorMessage: string = '';
  private formChange = new BehaviorEmitter({})
  private submitEmitter = new Emitter();

  constructor(config: FormConfig<C>, initialData: any = null) {
    Object.entries<inputConfig>(config).forEach(item => {
      this.children[item[0]] = new AppInputControl(item[1], (v) => this.formChange.emitValue(v), initialData)
    })
  }

  get isValid() {
    return !Object.values<InputControl>(this.children).find(control => !control.isValid)
  }

  reset() {
    Object.values<InputControl>(this.children).forEach(control => control.reset())
    this.touched = false; //TODO: should reset?
  }

  setDisabled(value: boolean){
    this.disabled = value;
    Object.values<InputControl>(this.children).forEach(control => control.setDisabled(value))
    return this
  };

  onFormChange(callback: (value) => void) {
    return this.formChange.subscribe(callback)
  }

  onSubmit(callback: (value) => void) {
    return this.submitEmitter.subscribe(callback)
  }

  submit = (callback: submitCallback<C>) => {
    const form = this.submitForm();
    if(form) {
      callback(form);
    }
  }

  registerForm() {
    return {
      // onChange: this.onChange,
      onSubmit: this.submitForm,
      ref: this.setForm,
    }
  }


  registerInput(name) {
    return {
      inputRef: (element) => {
        this.disabled = false;
        //@ts-ignore
        this.children[name].setInputRef(element);
      },
      onBlur: () => {
        this.touched = true; //TODO: change to not set value everytime
        //@ts-ignore
        this.children[name].setTouched();
      },
      onChange: this.onChange,
      name,
      value: this.children[name].value,
      error: !this.children[name].isValid,
      helperText: this.children[name].errorMessage,
      disabled: this.children[name].disabled,
    }
  }

  setIsValid(error) {
    if(!error) {
      this.errorMessage = '';
      this.formChange.emitValue({})
      return
    }
    if(error.fields.length > 1) {
      this.errorMessage = error.message;
      this.formChange.emitValue({})
    } else {
      this.children[error.fields[0]].setIsValid(error.message);
    }
  }

  private setForm = (element: HTMLFormElement) => {
    this.ref = element;
  }


  private checkIsValid() {
    const controls = Object.values<InputControl>(this.children);
    controls.forEach(control => control.validate())
    return this.isValid
  }

  private submitForm = (event?: Event) => {
    if(event) {
      event.preventDefault();
    }
    this.touched = true;
    if(!this.disabled && this.checkIsValid()) {
      const form = Object.entries<InputControl>(this.children).reduce((form, control) => {
        form[control[0]] = control[1].value;
        return form;
      }, {})
      this.submitEmitter.emitValue(form);
      return form as Form<C>;
    }
    return null
  }

  private onChange = (e: any) => {
    const inputControl = this.children[e.target.name]
    if(inputControl) {
      inputControl.onInput(e)
    }
  }
}
