import React from 'react';
import { Currency } from '../../../models/Currency.model';
import { currencyService } from '../../../services/data/Currency/Currency.service';
import OptionComponent from '../../ui/Option/Option.component';
import SelectComponent from '../../ui/Select/Select.component';
import CurrencySelectorItemComponent from './CurrencySelectorItem/CurrencySelectorItem.component';

import './CurrencySelector.style.scss';

export default class CurrencySelectorComponent extends React.Component<unknown, CurrencySelectorState> {
  private unlisten?: () => void;

  constructor(props: unknown) {
    super(props);

    this.state = {
      currencies: []
    };
  }

  private onCurrenciesChange(currencies: Currency[] | null | undefined) {
    if(!currencies) 
      return;
    this.setState({
      currencies
    });
  }

  componentDidMount() {
    this.unlisten = currencyService.listen(
      (data) => this.onCurrenciesChange(data),
      true
    );
  }

  componentWillUnmount() {
    this.unlisten?.();
  }

  render() {
    return (
      <div className='currency-selector'>
        <SelectComponent value={0}>
          { this.renderCurrencies() }
        </SelectComponent>
      </div>
    );
  }

  renderCurrencies() {
    return this.state.currencies.map((currency) => {
      return (
        <OptionComponent
          key={currency.label}
          label={currency.symbol}
          value={currency}
        >
          <CurrencySelectorItemComponent currency={currency} />
        </OptionComponent>
      );
    });
  }
}

export interface CurrencySelectorState {
  currencies: Currency[];
}
