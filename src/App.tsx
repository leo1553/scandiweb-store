import React from 'react';
import AppRoutes from './AppRoutes';
import NavbarComponent from './components/Navbar/Navbar.component';

import './styles/styles.scss';

export default class App extends React.Component {
  render() {
    return (
      <>
        <NavbarComponent />
        <AppRoutes />
      </>
    );
  }
}
