import classNames from 'classnames';
import React from 'react';

import './ProductLabel.style.scss';

export default class ProductLabelComponent extends React.PureComponent<ProductNameProps> {
  get className() {
    return classNames(
      'product-label',
      this.props.className
    );
  }

  render() {
    const { label, children, ...props } = this.props;
    return (
      <div {...props} className={this.className}>
        <span className='product-label__text'>{label}</span>
        <div className='product-label__content'>
          {children}
        </div>
      </div>
    );
  }
}

export interface ProductNameProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}
