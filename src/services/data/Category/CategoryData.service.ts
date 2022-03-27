import { client, Query } from '@tilework/opus';
import { Category } from '../../../models/Category.model';
import { StoreDataServiceBase } from '../StoreDataServiceBase';

export class CategoryDataService extends StoreDataServiceBase<Category[]> {
  constructor() {
    super(undefined);
  }

  queryCategories() {
    const query = new Query<'categories', Category, true>('categories')
      .addField('name');

    this.store.notify(undefined);

    return client.post(query).then(
      (data) => {
        const result = data.categories as Category[];
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

export const categoryDataService = new CategoryDataService();
