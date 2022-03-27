import { client, Query } from '@tilework/opus';
import { Currency } from '../../../models/Currency.model';
import { StoreDataServiceBase } from '../StoreDataServiceBase';

export class CurrencyService extends StoreDataServiceBase<Currency[]> {
  constructor() {
    super(undefined);
  }

  queryCurrencies() {
    const query = new Query<'currencies', Currency, true>('currencies')
      .addField('label')
      .addField('symbol');

    this.store.notify(undefined);

    return client.post(query).then(
      (data) => {
        const result = data.currencies as Currency[];
        this.store.notify(result);
        return result;
      },
      () => {
        this.store.notify(null);
        return null;
      }
    );
  }
}

export const currencyDataService = new CurrencyService();
