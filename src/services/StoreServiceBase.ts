import { Store, StoreListener } from './Store';

export abstract class StoreServiceBase<S> {
  protected store: Store<S>;

  constructor(initialState: S) {
    this.store = new Store<S>(initialState);
  }

  get value() {
    return this.store.value;
  }

  listen(listener: StoreListener<S>, emit = false) {
    return this.store.listen(listener, emit);
  }

  removeListener(listener: StoreListener<S>) {
    return this.store.removeListener(listener);
  }
}
