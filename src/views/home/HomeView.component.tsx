import React from 'react';
import { Navigate } from 'react-router-dom';

export default class HomeViewComponent extends React.Component {
  render() {
    return (
      <Navigate to='/listing/women' />
    );
  }
}
