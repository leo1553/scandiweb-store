import React from 'react';
import { Currency } from '../../../models/Currency.model';
import { Price } from '../../../models/Product.model';
import { currencyService } from '../../../services/Currency/Currency.service';

export default class ProductPriceComponent extends React.Component<ProductPriceProps, ProductPriceState> {
  private unlisten?: () => void;

  constructor(props: ProductPriceProps) {
    super(props);
    this.state = {
      price: undefined
    };
  }

  private get price() {
    if(this.state.price) 
      return `${this.state.price.currency.symbol}${this.state.price.amount}`;
  }

  private findPrice(currencyLabel: string) {
    return this.props.prices?.find(price => price.currency.label === currencyLabel);
  }

  private updateCurrency(currency: Currency | null) {
    let price: Price | undefined;
    if(currency)
      price = this.findPrice(currency.label);
    if(!price)
      price = this.state.price;
    if(!price && this.props.prices && this.props.prices.length > 0)
      price = this.props.prices[0];
    this.setState({ price });
  }

  componentDidMount() {
    this.unlisten = currencyService.listen((currency) => this.updateCurrency(currency));
    this.updateCurrency(currencyService.value);
  }

  componentWillUnmount() {
    this.unlisten?.();
  }

  render() {
    return this.price ?? null;
  }
}

export interface ProductPriceProps {
  prices: Price[] | undefined;
}

export interface ProductPriceState {
  price: Price | undefined;
}
