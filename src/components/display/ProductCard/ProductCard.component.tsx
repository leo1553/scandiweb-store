import React from 'react';
import { Product } from '../../../models/Product.model';
import CardComponent from '../../ui/Card/Card.component';
import IconButtonComponent from '../../ui/IconButton/IconButton.component';
import { ReactComponent as Cart } from '../../../assets/icons/cart.svg';

import './ProductCard.style.scss';
import classNames from 'classnames';

export default class ProductCardComponent extends React.Component<ProductCardProps> {
  private get imageSource() {
    return this.props.product.gallery?.[0] ?? '/img/product-image-placeholder.jpg';
  }

  private get price() {
    if(this.props.product.prices)
      return `${this.props.product.prices[0].currency.symbol}${this.props.product.prices[0].amount}`;
  }

  private get inStock() {
    return this.props.product.inStock !== false;
  }

  private get productCardClassName() {
    return classNames(
      'product-card',
      {
        'product-card--out-of-stock': !this.inStock
      }
    );
  }

  render() {
    return (
      <CardComponent className='product-card__hover'>
        <div className={this.productCardClassName}>
          <div className='product-card__image-container'>
            <img className='product-card__image' src={this.imageSource} />
            { this.renderOutOfStock() }
          </div>
          <div className='product-card__details'>
            <div className='product-card__name'>{this.props.product.name}</div>
            <div className='product-card__price'>{this.price}</div>
            { this.renderFloatButton() }
          </div>
        </div>
      </CardComponent>
    );
  }

  private renderOutOfStock() {
    if(!this.inStock) {
      return <span className='product-card__out-of-stock'>OUT OF STOCK</span>;
    }
  }

  private renderFloatButton() {
    if(this.inStock) {
      return (
        <div className='product-card__float-button'>
          <IconButtonComponent icon={<Cart />} />
        </div>
      );
    }
  }
}

export interface ProductCardProps {
  product: Product;
}
