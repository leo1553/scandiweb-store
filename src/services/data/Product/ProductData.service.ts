import { client, Field, Query } from '@tilework/opus';
import { Category } from '../../../models/Category.model';
import { Product } from '../../../models/Product.model';
import { Store } from '../../Store';

export class ProductDataService {
  readonly currentProductCategory = new Store<string | undefined>(undefined);

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
        .addField('brand')
      );

    return client.post(query).then(
      (data) => {
        const result = data.category?.products as Product[] ?? null;
        return result;
      },
      () => {
        return null;
      }
    );
  }

  getProduct(productId: string) {
    const query = new Query('product')
      .addArgument('id', 'String!', productId)
      .addField('id')
      .addField('name')
      .addField('inStock')
      .addField('gallery', true)
      .addField('description')
      .addField('category')
      .addField(new Field('attributes', true)
        .addField('id')
        .addField('name')
        .addField('type')
        .addField(new Field('items', true)
          .addField('displayValue')
          .addField('value')
          .addField('id')
        )
      )
      .addField(new Field('prices', true)
        .addField(new Field('currency')
          .addField('label')
          .addField('symbol'))
        .addField('amount')
      )
      .addField('brand');

    return client.post(query).then(
      (data) => {
        const result = data.product as Product ?? null;
        return result;
      },
      () => {
        return null;
      }
    );
  }
}

export const productDataService = new ProductDataService();
