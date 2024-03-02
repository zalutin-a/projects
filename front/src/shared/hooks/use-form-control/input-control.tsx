import { Emitter } from "src/shared/utils";
import { InputControl, inputConfig } from "./types";

export class AppInputControl<C> implements InputControl<C> {
  ref: HTMLInputElement = null;
  value: any = null;
  isValid: boolean = true;
  disabled: boolean = true;
  errorMessage: string = '';
  touched: boolean = false;
  private config: inputConfig;
  private formChangeEmitter;
  private mounted = false;
  private changeEmmiter = new Emitter<C>();

  constructor(config: inputConfig, formChangeEmitter: (v) => void) {
    this.config = config;
    this.formChangeEmitter = formChangeEmitter;
    this.value = config.initialValue;
  }
  onChange(callback: (value: C) => void) {
    return this.changeEmmiter.subscribe(callback);
  }

  setValue(value: C) {
    const transformedValue = this.config.transform(value);
    this.value = transformedValue;
    this.validate();
    return this as InputControl<C>
  };

  setIsValid(message: string = '') {
    this.isValid = !message;
    this.errorMessage = message;
    // this.ref.setCustomValidity(message);
    this.formChangeEmitter({});
    return this as InputControl<C>
  }


  setDisabled(value: boolean) {
    this.disabled = !!value;
    this.formChangeEmitter({});
    return this as InputControl<C>
  }


  validate() {
    this.touched = true;
    this.errorMessage = '';
    if(this.config.isRequred && !this.value) {
      this.errorMessage = 'This field is required';
    }
    if(!this.errorMessage) {
      this.errorMessage = this.config.validator(this.value);
    }
    this.isValid = !this.errorMessage;
    // this.ref.setCustomValidity(error)
    this.formChangeEmitter({});
  }

  reset() {
    this.value = this.config.initialValue;
    this.isValid = true;
    this.errorMessage = '';
    this.touched = false; //TODO: should reset?
    this.formChangeEmitter({})
  }
///////
  onInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const transformedValue = this.config.transform(this.config.isCheckboxOrRadio ? target.checked : target.value)
    this.value = transformedValue;
    if(this.touched) {
      this.validate()
    }
    this.changeEmmiter.emitValue(this.value);
    this.formChangeEmitter({});
  }

  setInputRef(element: HTMLInputElement) {
    // if(element && this.ref !== element) {
      this.ref = element;
      this.mounted = true;
      this.disabled = false;
    // }


  }

  setTouched = () => { //TODO: public?
    if(!this.touched) {
      this.touched = true;
      this.validate();
    }
  }
}
