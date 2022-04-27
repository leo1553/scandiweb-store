import React from 'react';
import { Product } from '../../../models/Product.model';

export default class ProductNameComponent extends React.Component<ProductNameProps> {
  render() {
    return `${this.props.product.brand} ${this.props.product.name}`;
  }
}

export interface ProductNameProps {
  product: Product;
}
