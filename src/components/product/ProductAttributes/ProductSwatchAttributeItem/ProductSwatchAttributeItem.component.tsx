import classNames from 'classnames';
import React from 'react';
import { ProductAttributeItemProps } from '../ProductAttribute/ProductAttribute.component';

import './ProductSwatchAttributeItem.style.scss';

export default class ProductSwatchAttributeItemComponent extends React.PureComponent<ProductAttributeItemProps, ProductSwatchAttributeItemState> {
  static currentItemIndex = 1;

  constructor(props: ProductAttributeItemProps) {
    super(props);
    this.state = {
      itemIndex: ProductSwatchAttributeItemComponent.currentItemIndex++
    };
  }

  get labelClassName() {
    return classNames(
      'product-swatch-attribute-item__label',
      'button',
      {
        'product-swatch-attribute-item__label--disabled': this.props.disabled
      }
    );
  }

  render() {
    return (
      <div className="product-swatch-attribute-item">
        <input
          className='product-swatch-attribute-item__input'
          type='radio'
          name={this.props.attribute.name}
          value={this.props.item.value}
          id={`product-swatch-attribute-item-${this.state.itemIndex}`}
          disabled={this.props.disabled}
        />
        <label
          className={this.labelClassName}
          htmlFor={`product-swatch-attribute-item-${this.state.itemIndex}`}
          title={this.props.item.displayValue}
          style={{backgroundColor: this.props.item.value}}
        />
      </div>
    );
  }
}

export interface ProductSwatchAttributeItemState {
  itemIndex: number;
}
