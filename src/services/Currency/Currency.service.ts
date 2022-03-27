import { Currency } from '../../models/Currency.model';
import { localStorageService } from '../LocalStorage/LocalStorage.service';
import { Store } from '../Store';

export class CurrencyService extends Store<Currency | null> {
  static readonly LOCAL_STORAGE_KEY = 'currency';

  constructor() {
    super(CurrencyService.readFromLocalStorage());
    this.listen((currency) => this.onCurrencyChange(currency));
  }

  private onCurrencyChange(currency: Currency | null) {
    localStorageService.set(CurrencyService.LOCAL_STORAGE_KEY, currency);
  }

  private static readFromLocalStorage(): Currency | null {
    return localStorageService.get(CurrencyService.LOCAL_STORAGE_KEY);
  }
}

export const currencyService = new CurrencyService();
