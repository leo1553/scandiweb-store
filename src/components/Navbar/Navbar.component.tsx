import React from 'react';
import './Navbar.style.scss';
import NavbarButtonsComponent from './NavbarButtons/NavbarButtons.component';
import NavbarItemsComponent from './NavbarItems/NavbarItems.component';

const paths = [
  {
    title: 'Women',
    path: '/listing/women'
  }, 
  {
    title: 'Men',
    path: '/listing/men'
  }, 
  {
    title: 'Kids',
    path: '/listing/kids'
  }
];

export default class NavbarComponent extends React.Component {
  render() {
    return (
      <div className='navbar'>
        <div className='navbar__container'>
          <NavbarItemsComponent paths={paths} />
        </div>
        <img className='navbar__logo' src='/img/logo.svg' />
        <div className='navbar__container navbar__container--right'>
          <NavbarButtonsComponent></NavbarButtonsComponent>
        </div>
      </div>
    );
  }
}
