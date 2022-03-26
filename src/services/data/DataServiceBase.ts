import { Store, StoreListener } from './Store';

export enum DataServiceState {
  LOADING,
  ERROR,
  LOADED
}

export abstract class DataServiceBase<T, S = T | null | undefined> {
  protected store: Store<S>;

  constructor(initialState: S) {
    this.store = new Store<S>(initialState);
  }

  get state() {
    if(this.isLoading())
      return DataServiceState.LOADING;
    if(this.isError())
      return DataServiceState.ERROR;
    return DataServiceState.LOADED;
  }

  get value() {
    return this.store.value;
  }

  isLoading() {
    return this.store.value === undefined;
  }

  isError() {
    return this.store.value === null;
  }

  isLoaded() {
    return this.state === DataServiceState.LOADED;
  }

  listen(listener: StoreListener<S>, emit = false) {
    return this.store.listen(listener, emit);
  }

  removeListener(listener: StoreListener<S>) {
    return this.store.removeListener(listener);
  }
}
