import { client, Query } from '@tilework/opus';
import { Currency } from '../../../models/Currency.model';
import { StoreServiceBase } from '../StoreServiceBase';

export class CurrencyService extends StoreServiceBase<Currency[]> {
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

export const currencyService = new CurrencyService();
