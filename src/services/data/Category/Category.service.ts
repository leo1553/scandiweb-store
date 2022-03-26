import { client, Query } from '@tilework/opus';
import { Category } from '../../../models/Category.model';
import { StoreServiceBase } from '../StoreServiceBase';

export class CategoryService extends StoreServiceBase<Category[]> {
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

export const categoryService = new CategoryService();
