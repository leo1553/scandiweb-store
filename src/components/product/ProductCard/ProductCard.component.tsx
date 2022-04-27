import React from 'react';
import { Product } from '../../../models/Product.model';
import CardComponent from '../../ui/Card/Card.component';
import IconButtonComponent from '../../ui/IconButton/IconButton.component';
import { ReactComponent as Cart } from '../../../assets/icons/cart.svg';

import './ProductCard.style.scss';
import classNames from 'classnames';
import ProductPriceComponent from '../ProductPrice/ProductPrice.component';
import ImageComponent from '../../ui/Image/Image.component';
import ProductNameComponent from '../ProductName/ProductName.component';

export default class ProductCardComponent extends React.Component<ProductCardProps> {
  private get imageSource() {
    return this.props.product.gallery?.[0] ?? '/img/product-image-placeholder.jpg';
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
            <ImageComponent className='product-card__image' source={this.imageSource} />
            { this.renderOutOfStock() }
          </div>
          <div className='product-card__details'>
            <div className='product-card__name'>
              <ProductNameComponent product={this.props.product} />
            </div>
            <span className='product-card__price'>
              <ProductPriceComponent prices={this.props.product.prices} />
            </span>
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
