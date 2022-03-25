import React from 'react';
import { Link } from 'react-router-dom';
import IconButtonComponent from '../../IconButton/IconButton.component';
import OptionComponent from '../../Option/Option.component';
import SelectComponent from '../../Select/Select.component';
import './NavbarButtons.style.scss';

export default class NavbarButtonsComponent extends React.Component {
  render() {
    return (
      <div className='navbar-buttons'>
        <div className='navbar-buttons__currency'>
          <SelectComponent
            placeholder='$'
          >
            <OptionComponent name='$' value='0'>Dolar</OptionComponent>
            <OptionComponent name='R$' value='1' disabled={true}>Real</OptionComponent>
            <OptionComponent name='EU' value='2'>Euro</OptionComponent>
          </SelectComponent>
        </div>
        <Link to='/cart'>
          <IconButtonComponent icon='/img/cart.svg' />
        </Link>
      </div>
    );
  }
}
