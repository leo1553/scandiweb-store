import classNames from 'classnames';
import React from 'react';
import { Attribute, AttributeSet } from '../../../../models/Product.model';
import ProductLabelComponent from '../../ProductLabel/ProductLabel.component';
import ProductSwatchAttributeComponent from '../ProductSwatchAttributeItem/ProductSwatchAttributeItem.component';
import ProductTextAttributeItemComponent from '../ProductTextAttributeItem/ProductTextAttributeItem.component';

import './ProductAttribute.style.scss';

export default class ProductAttributeComponent extends React.PureComponent<ProductAttributeProps> {
  get name() {
    return this.props.attribute.name?.toUpperCase() ?? 'ATTR';
  }

  get className() {
    return classNames(
      'product-attribute',
      this.props.className
    );
  }

  render() {
    const { attribute, disabled, ...props } = this.props;
    return (
      <ProductLabelComponent
        {...props}
        className={this.className}
        label={`${this.name}:`}
      >
        { attribute.items?.map((attr) => 
          this.attributeItemFactory(attr)
        )}
      </ProductLabelComponent>
    );
  }

  private attributeItemFactory(item: Attribute) {
    const type = this.props.attribute.type;
    const props: ProductAttributeItemProps = {
      attribute: this.props.attribute,
      disabled: this.props.disabled,
      item
    };

    switch(type) {
      case 'text':
        return <ProductTextAttributeItemComponent key={item.id} {...props} />;
      case 'swatch':
        return <ProductSwatchAttributeComponent key={item.id} {...props} />;
    }
  }
}

export interface ProductAttributeProps extends React.HTMLAttributes<HTMLDivElement> {
  attribute: AttributeSet;
  disabled: boolean;
}

export interface ProductAttributeItemProps {
  attribute: AttributeSet;
  disabled: boolean;
  item: Attribute;
}
