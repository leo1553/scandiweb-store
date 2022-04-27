import React from 'react';
import AppRoutesComponent from '../AppRoutes/AppRoutes';
import NavbarComponent from '../../navbar/Navbar/Navbar.component';
import { categoryDataService } from '../../../services/data/Category/CategoryData.service';
import { currencyDataService } from '../../../services/data/Currency/CurrencyData.service';

import './App.style.scss';
import LoadingComponent from '../../ui/Loading/Loading.component';
import ErrorComponent from '../../ui/Error/Error.component';

export default class AppComponent extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      error: this.isError,
      loading: this.isLoading
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
      error: this.isError,
      loading: this.isLoading
    });
  }

  queryData() {
    this.queryCategories();
    this.queryCurrencies();
    this.setState({
      error: this.isError,
      loading: this.isLoading
    });
  }

  componentDidMount() {
    this.queryData();
  }

  render() {
    return (
      <div className='app'>
        {this.renderState()}
      </div>
    );
  }

  private renderState() {
    if(this.state.error)
      return this.renderError();
    if(this.state.loading)
      return this.renderLoading();
    return this.renderContent();
  }

  private renderContent() {
    return (
      <>
        <div className='app__navbar'>
          <NavbarComponent />
        </div>
        <div className='app__view'>
          <AppRoutesComponent />
        </div>
      </>
    );
  }

  private renderLoading() {
    return (
      <div className='app__exception'>
        <LoadingComponent />
      </div>
    );
  }

  private renderError() {
    return (
      <div className='app__exception'>
        <ErrorComponent 
          code='😮'
          header='Something went wrong'
          message='I hope you just forgot to start the back-end 😅'
          retry={() => this.queryData()}
        />
      </div>
    );
  }
}

export interface AppState {
  loading: boolean;
  error: boolean;
}
