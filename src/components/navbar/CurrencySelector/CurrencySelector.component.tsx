import React from 'react';
import { Currency } from '../../../models/Currency.model';
import { currencyDataService } from '../../../services/data/Currency/CurrencyData.service';
import OptionComponent from '../../ui/Option/Option.component';
import SelectComponent, { SelectChangeEvent } from '../../ui/Select/Select.component';
import CurrencySelectorItemComponent from './CurrencySelectorItem/CurrencySelectorItem.component';

import './CurrencySelector.style.scss';
import { currencyService } from '../../../services/Currency/Currency.service';

export default class CurrencySelectorComponent extends React.PureComponent<unknown, CurrencySelectorState> {
  private unlisten?: () => void;

  constructor(props: unknown) {
    super(props);

    this.state = {
      currencies: [],
      current: currencyService.value
    };
  }

  get currentCurrencyIndex() {
    return this.state.currencies.findIndex(currency => this.state.current?.label === currency.label);
  }

  private onCurrenciesChange(currencies: Currency[] | null | undefined) {
    if(!currencies) 
      return;
    this.setState({
      currencies,
      current: this.state.current ?? currencies[0]
    });
  }

  private onSelectChange(event: SelectChangeEvent<Currency>) {
    currencyService.notify(event.value);
  }

  componentDidMount() {
    this.unlisten = currencyDataService.listen(
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
        <SelectComponent
          value={this.currentCurrencyIndex}
          onChange={(event) => this.onSelectChange(event)}
        >
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
  current: Currency | null;
}
