import React from 'react';
import { Price, Product } from '../../../models/Product.model';
import CardComponent from '../../ui/Card/Card.component';
import IconButtonComponent from '../../ui/IconButton/IconButton.component';
import { ReactComponent as Cart } from '../../../assets/icons/cart.svg';

import './ProductCard.style.scss';
import classNames from 'classnames';
import { currencyService } from '../../../services/Currency/Currency.service';
import { Currency } from '../../../models/Currency.model';

export default class ProductCardComponent extends React.Component<ProductCardProps, ProductCardState> {
  private unlisten?: () => void;

  constructor(props: ProductCardProps) {
    super(props);
    this.state = {
      price: undefined
    };
  }

  private get imageSource() {
    return this.props.product.gallery?.[0] ?? '/img/product-image-placeholder.jpg';
  }

  private get price() {
    if(this.state.price) 
      return `${this.state.price.currency.symbol}${this.state.price.amount}`;
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

  private findPrice(currencyLabel: string) {
    return this.props.product.prices?.find(price => price.currency.label === currencyLabel);
  }

  componentDidMount() {
    this.unlisten = currencyService.listen((currency) => this.updateCurrency(currency));
    this.updateCurrency(currencyService.value);
  }

  componentWillUnmount() {
    this.unlisten?.();
  }

  updateCurrency(currency: Currency | null) {
    let price: Price | undefined;
    if(currency)
      price = this.findPrice(currency.label);
    if(!price)
      price = this.state.price;
    if(!price && this.props.product.prices && this.props.product.prices.length > 0)
      price = this.props.product.prices[0];
    this.setState({ price });
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

export interface ProductCardState {
  price: Price | undefined;
}
