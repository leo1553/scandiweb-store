import React from 'react';
import AppRoutes from './AppRoutes';
import NavbarComponent from './components/navbar/Navbar/Navbar.component';
import { categoryDataService } from './services/data/Category/CategoryData.service';
import { currencyDataService } from './services/data/Currency/CurrencyData.service';

import './App.style.scss';
import './styles/styles.scss';

export default class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      isError: this.isError,
      isLoading: this.isLoading
    };
  }

  get isLoading() {
    return categoryDataService.isLoading() || currencyDataService.isLoading();
  }

  get isError() {
    return categoryDataService.isError() || currencyDataService.isError();
  }

  private queryCategories() {
    categoryDataService
      .queryCategories()
      .then(() => this.onServiceResponse());
  }

  private queryCurrencies() {
    currencyDataService
      .queryCurrencies()
      .then(() => this.onServiceResponse());
  }

  private onServiceResponse() {
    this.setState({
      isError: this.isError,
      isLoading: this.isLoading
    });
  }

  componentDidMount() {
    this.queryCategories();
    this.queryCurrencies();
  }

  render() {
    if(this.state.isError)
      return this.renderError();
    if(this.state.isLoading)
      return this.renderLoading();
    return this.renderContent();
  }

  private renderContent() {
    return (
      <div className='app'>
        <NavbarComponent />
        <div className='app__view-container'>
          <div className='app__view'>
            <AppRoutes />
          </div>
        </div>
      </div>
    );
  }

  private renderLoading() {
    return <div>Loading...</div>;
  }

  private renderError() {
    return <div>Error</div>;
  }
}

export interface AppState {
  isLoading: boolean;
  isError: boolean;
}
