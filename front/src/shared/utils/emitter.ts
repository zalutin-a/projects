export class Emitter<T = any> {
  protected subscribers = new Map();
  protected valueEmmiter = this.getValueEmmiter()

  constructor() {
    this.valueEmmiter.next()
  }
  
  subscribe(callback) {
    const key = {}
    this.subscribers.set(key, callback)

    return () => {
      this.subscribers.delete(key)
    };
  }

  emitValue(value: T) {
    this.valueEmmiter.next(value)
  }

  private * getValueEmmiter() {
    while (true) {
      const value = yield;
      this.subscribers.forEach(callback => callback(value));
    }
  }
}

export class BehaviorEmitter<T = any> extends Emitter<T> {
  private lastValue: T;

  constructor(initialValue: T) {
    super();
    this.lastValue = initialValue;
  }

  subscribe(callback) {
    const key = {}
    this.subscribers.set(key, callback)
    callback(this.lastValue);
    return () => {this.subscribers.delete(key)};
  }

  emitValue(value: T) {
    this.lastValue = value
    this.valueEmmiter.next(this.lastValue)
  }
}
