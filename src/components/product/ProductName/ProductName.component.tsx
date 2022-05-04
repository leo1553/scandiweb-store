import classNames from 'classnames';
import React from 'react';
import { Product } from '../../../models/Product.model';

import './ProductName.style.scss';

export default class ProductNameComponent extends React.PureComponent<ProductNameProps> {
  get className() {
    return classNames(
      'product-name',
      this.props.className
    );
  }

  render() {
    const { product, ...props } = this.props;
    return (
      <div {...props} className={this.className}>
        <span className='product-name__brand'>{product.brand}</span>
        <span className='product-name__name'>{product.name}</span>
      </div>
    );
  }
}

export interface ProductNameProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}
