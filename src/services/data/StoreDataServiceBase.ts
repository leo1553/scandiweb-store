import { StoreServiceBase } from '../StoreServiceBase';

export enum StoreDataServiceState {
  LOADING,
  ERROR,
  LOADED
}

export abstract class StoreDataServiceBase<T, S = T | null | undefined> extends StoreServiceBase<S> {
  constructor(initialState: S) {
    super(initialState);
  }

  get state() {
    if(this.isLoading())
      return StoreDataServiceState.LOADING;
    if(this.isError())
      return StoreDataServiceState.ERROR;
    return StoreDataServiceState.LOADED;
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
    return this.state === StoreDataServiceState.LOADED;
  }
}
