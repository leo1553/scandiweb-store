import React from 'react';
import AppRoutes from './AppRoutes';
import NavbarComponent from './components/navbar/Navbar/Navbar.component';
import { categoryService } from './services/data/Category/Category.service';
import { currencyService } from './services/data/Currency/Currency.service';

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
    return categoryService.isLoading() || currencyService.isLoading();
  }

  get isError() {
    return categoryService.isError() || currencyService.isError();
  }

  private queryCategories() {
    categoryService
      .queryCategories()
      .then(() => this.onServiceResponse());
  }

  private queryCurrencies() {
    currencyService
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
      <>
        <NavbarComponent />
        <AppRoutes />
      </>
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
