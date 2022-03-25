import React from 'react';
import { Link } from 'react-router-dom';
import IconButtonComponent from '../../../ui/IconButton/IconButton.component';
import OptionComponent from '../../../ui/Option/Option.component';
import SelectComponent from '../../../ui/Select/Select.component';
import './NavbarButtons.style.scss';
import { ReactComponent as Cart } from '../../../../assets/icons/cart.svg';

export default class NavbarButtonsComponent extends React.Component {
  render() {
    return (
      <div className='navbar-buttons'>
        <div className='navbar-buttons__currency'>
          <SelectComponent
            selectedIndex={0}
          >
            <OptionComponent name='$' value='0'>Dolar</OptionComponent>
            <OptionComponent name='R$' value='1' disabled={true}>Real</OptionComponent>
            <OptionComponent name='EU' value='2'>Euro</OptionComponent>
          </SelectComponent>
        </div>
        <Link to='/cart'>
          <IconButtonComponent icon={<Cart />} />
        </Link>
      </div>
    );
  }
}
