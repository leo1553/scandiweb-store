import React from 'react';
import { Currency } from '../../../../models/Currency.model';

import './CurrencySelectorItem.style.scss';

export default class CurrencySelectorItemComponent extends React.PureComponent<CurrencySelectorItemProps> {
  render() {
    return (
      <div className='currency-selector-item'>
        <span className='currency-selector-item__symbol'>{this.props.currency.symbol}</span>
        <span>{this.props.currency.label}</span>
      </div>
    );
  }
}

export interface CurrencySelectorItemProps {
  currency: Currency;
}
