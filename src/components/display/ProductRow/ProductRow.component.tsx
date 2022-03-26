import React from 'react';
import { Product } from '../../../models/Product.model';
import ProductCardComponent from '../ProductCard/ProductCard.component';

import './ProductRow.style.scss';

export default class ProductRowComponent extends React.Component<ProductRowProps> {
  render() {
    return (
      <div className='product-row'>
        {this.renderProducts()}
      </div>
    );
  }

  private renderProducts() {
    return this.props.products.map(product => (
      <ProductCardComponent key={product.id} product={product} />
    ));
  }
}

export interface ProductRowProps {
  products: Product[];
}
