import React from 'react';
import './Navbar.style.scss';
import NavbarItemsComponent from './NavbarItems/NavbarItems.component';

const paths = [
  {
    title: 'Women',
    path: '/'
  }, 
  {
    title: 'Men',
    path: '/cart'
  }, 
  {
    title: 'Kids',
    path: '/cart'
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
        <div className='navbar__container'></div>
      </div>
    );
  }
}
