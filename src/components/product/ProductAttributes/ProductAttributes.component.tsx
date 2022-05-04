import classNames from 'classnames';
import React from 'react';
import { AttributeSet } from '../../../models/Product.model';
import ProductAttributeComponent from './ProductAttribute/ProductAttribute.component';

import './ProductAttributes.style.scss';

export default class ProductAttributesComponent extends React.PureComponent<ProductAttributesProps> {
  get className() {
    return  classNames(
      'product-attributes',
      {
        'product-attributes--disabled': this.props.disabled
      },
      this.props.className
    );
  }

  render() {
    const { attributes, disabled, ...props } = this.props;
    return (
      <div {...props} className={this.className}>
        { attributes.map((attribute, index) =>
          <ProductAttributeComponent
            key={index}
            attribute={attribute}
            disabled={disabled}
            className='product-attributes__attribute'
          />
        )}
      </div>
    );
  }
}

export interface ProductAttributesProps extends React.HTMLAttributes<HTMLDivElement> {
  attributes: AttributeSet[];
  disabled: boolean;
}
