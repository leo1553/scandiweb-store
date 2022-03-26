export type StoreListener<T> = (state: T) => void;

export class Store<T> {
  private state: T;
  private listeners: StoreListener<T>[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  get value() {
    return this.state;
  }

  notify(state: T) {
    this.state = state;
    this.listeners.forEach(listener => listener(this.state));
  }

  listen(listener: StoreListener<T>, emit = false) {
    this.listeners.push(listener);

    if(emit) 
      listener(this.state);

    return () => {
      this.removeListener(listener);
    };
  }

  removeListener(listener: StoreListener<T>) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }
}
