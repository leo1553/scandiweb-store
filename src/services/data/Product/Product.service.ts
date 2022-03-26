import { client, Field, Query } from '@tilework/opus';
import { Product } from '../../../models/Product.model';

export class ProductService {
  getProducts(categoryName: string) {
    const query = new Query<'category', Product[], false>('category')
      .addArgument('input', 'CategoryInput', { title: categoryName })
      .addField(new Field('products', true)
        .addField('name')
        .addField('inStock')
        .addField('gallery', true)
        .addField(new Field('prices', true)
          .addField(new Field('currency')
            .addField('label')
          )
          .addField('amount')
        )
      );

    return client.post(query).then(
      (data) => {
        const result = data.category as Product[];
        return result;
      },
      () => {
        return null;
      }
    );
  }
}

export const productService = new ProductService();
