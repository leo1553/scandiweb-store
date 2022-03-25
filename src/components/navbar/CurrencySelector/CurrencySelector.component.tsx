import React from 'react';
import OptionComponent from '../../ui/Option/Option.component';
import SelectComponent from '../../ui/Select/Select.component';

import './CurrencySelector.style.scss';

const currencies = [
  {
    label: 'USD',
    symbol: '$'
  },
  {
    label: 'EUR',
    symbol: '€'
  },
  {
    label: 'JPY',
    symbol: '¥'
  }
];

export default class CurrencySelectorComponent extends React.Component {
  render() {
    return (
      <div className='currency-selector'>
        <SelectComponent
          selectedIndex={0}
        >
          { this.renderCurrencies() }
        </SelectComponent>
      </div>
    );
  }

  renderCurrencies() {
    return currencies.map((currency) => {
      return (
        <OptionComponent
          key={currency.label}
          name={currency.symbol}
          value={currency}
        >
          { `${currency.symbol} ${currency.label}` }
        </OptionComponent>
      );
    });
  }
}
