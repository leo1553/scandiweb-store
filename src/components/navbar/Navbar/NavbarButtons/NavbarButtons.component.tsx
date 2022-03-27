import React from 'react';
import './NavbarButtons.style.scss';
import CurrencySelectorComponent from '../../CurrencySelector/CurrencySelector.component';
import CartButtonComponent from '../../CartButton/CartButton.component';

export default class NavbarButtonsComponent extends React.Component {
  render() {
    return (
      <div className='navbar-buttons'>
        <CurrencySelectorComponent />
        <CartButtonComponent />
      </div>
    );
  }
}
