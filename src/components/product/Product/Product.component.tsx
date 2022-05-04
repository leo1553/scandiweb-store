import React from 'react';
import { Product } from '../../../models/Product.model';
import ProductAttributesComponent from '../ProductAttributes/ProductAttributes.component';
import ProductLabelComponent from '../ProductLabel/ProductLabel.component';
import ProductNameComponent from '../ProductName/ProductName.component';
import ProductPriceComponent from '../ProductPrice/ProductPrice.component';

import './Product.style.scss';

export default class ProductComponent extends React.PureComponent<ProductProps> {
  render() {
    return (
      <form className='product'>
        <ProductNameComponent className='product__name' product={this.props.product} />

        { this.renderAttributes() }

        <ProductLabelComponent
          className='product__price-container'
          label='PRICE:'
        >
          <span className='product__price'>
            <ProductPriceComponent prices={this.props.product.prices} />
          </span>
        </ProductLabelComponent>
      </form>
    );
  }

  private renderAttributes() {
    if(this.props.product.attributes) {
      return <ProductAttributesComponent
        className='product__attributes'
        attributes={this.props.product.attributes}
        disabled={!this.props.product.inStock} />;
    }
  }
}

export interface ProductProps {
  product: Product;
}
