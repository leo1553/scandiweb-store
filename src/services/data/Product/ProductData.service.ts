import { client, Field, Query } from '@tilework/opus';
import { Category } from '../../../models/Category.model';
import { Product } from '../../../models/Product.model';

export class ProductDataService {
  getProducts(categoryName: string) {
    const query = new Query<'category', Category, false>('category')
      .addArgument('input', 'CategoryInput', { title: categoryName })
      .addField(new Field('products', true)
        .addField('id')
        .addField('name')
        .addField('inStock')
        .addField('gallery', true)
        .addField(new Field('prices', true)
          .addField(new Field('currency')
            .addField('label')
            .addField('symbol')
          )
          .addField('amount')
        )
      );

    return client.post(query).then(
      (data) => {
        const result = data.category.products as Product[];
        return result;
      },
      () => {
        return null;
      }
    );
  }
}

export const productDataService = new ProductDataService();
