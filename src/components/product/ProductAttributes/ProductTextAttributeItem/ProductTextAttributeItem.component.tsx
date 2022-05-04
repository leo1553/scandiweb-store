import classNames from 'classnames';
import React from 'react';
import { ProductAttributeItemProps } from '../ProductAttribute/ProductAttribute.component';

import './ProductTextAttributeItem.style.scss';

export default class ProductTextAttributeItemComponent extends React.PureComponent<ProductAttributeItemProps, ProductTextAttributeItemState> {
  static currentItemIndex = 1;

  constructor(props: ProductAttributeItemProps) {
    super(props);
    this.state = {
      itemIndex: ProductTextAttributeItemComponent.currentItemIndex++
    };
  }

  get labelClassName() {
    return classNames(
      'product-text-attribute-item__label',
      'button',
      {
        'product-text-attribute-item__label--disabled': this.props.disabled
      }
    );
  }

  render() {
    return (
      <div className="product-text-attribute-item">
        <input
          className='product-text-attribute-item__input'
          type='radio'
          name={this.props.attribute.name}
          value={this.props.item.value}
          id={`product-text-attribute-item-${this.state.itemIndex}`}
          disabled={this.props.disabled}
        />
        <label
          className={this.labelClassName}
          htmlFor={`product-text-attribute-item-${this.state.itemIndex}`}
          title={this.props.item.displayValue}
        >
          {this.props.item.value}
        </label>
      </div>
    );
  }
}

export interface ProductTextAttributeItemState {
  itemIndex: number;
}
