import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CartViewComponent from '../../../views/Cart/CartView.component';
import HomeViewComponent from '../../../views/Home/HomeView.component';
import CategoryViewComponent from '../../../views/Category/CategoryView.component';
import NotFoundViewComponent from '../../../views/NotFound/NotFoundView.component';
import InternalErrorViewComponent from '../../../views/InternalError/InternalErrorView.component';

export default class AppRoutesComponent extends React.PureComponent {
  render() {
    return (
      <Routes>
        <Route path='/' element={<HomeViewComponent />} />
        <Route path='/cart' element={<CartViewComponent />} />
        <Route path='/404' element={<NotFoundViewComponent />} />
        <Route path='/500' element={<InternalErrorViewComponent />} />
        <Route path='/:category' element={<CategoryViewComponent />} />
        <Route path='*' element={<Navigate to={'/404'} />} />
      </Routes>
    );
  }
}
