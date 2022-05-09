import classNames from 'classnames';
import React from 'react';
import { Product } from '../../../../models/Product.model';
import CardComponent from '../../../ui/Card/Card.component';
import IconButtonComponent from '../../../ui/IconButton/IconButton.component';
import { ReactComponent as Cart } from '../../../../assets/icons/cart.svg';
import ProductPriceComponent from '../../ProductPrice/ProductPrice.component';
import ImageComponent from '../../../ui/Image/Image.component';
import ProductNameComponent from '../../ProductName/ProductName.component';

import './ProductCard.style.scss';
import placeholder from '../../../../assets/img/product-image-placeholder.jpg';
import { Link } from 'react-router-dom';

export default class ProductCardComponent extends React.PureComponent<ProductCardProps> {
  private get imageSource() {
    return this.props.product.gallery?.[0] ?? placeholder;
  }

  private get inStock() {
    return this.props.product.inStock !== false;
  }

  private get productCardClassName() {
    return classNames(
      'product-card__content',
      {
        'product-card__content--out-of-stock': !this.inStock
      }
    );
  }

  render() {
    return (
      <Link to={`/product/${this.props.product.id}`}>
        <CardComponent className='product-card'>
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
      </Link>
    );
  }

  private renderOutOfStock() {
    if(!this.inStock) {
      return <span className='product-card__out-of-stock'>OUT OF STOCK</span>;
    }
  }

  private renderFloatButton() {
    if(this.inStock) {
      return <IconButtonComponent 
        className='product-card__float-button'
        icon={<Cart />}
        color='primary' />;
    }
  }
}

export interface ProductCardProps {
  product: Product;
}
