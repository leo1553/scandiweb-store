import React from 'react';
import { Link } from 'react-router-dom';
import IconButtonComponent from '../../../ui/IconButton/IconButton.component';
import './NavbarButtons.style.scss';
import { ReactComponent as Cart } from '../../../../assets/icons/cart.svg';
import CurrencySelectorComponent from '../../CurrencySelector/CurrencySelector.component';

export default class NavbarButtonsComponent extends React.Component {
  render() {
    return (
      <div className='navbar-buttons'>
        <CurrencySelectorComponent />
        <Link to='/cart'>
          <IconButtonComponent icon={<Cart />} />
        </Link>
      </div>
    );
  }
}
