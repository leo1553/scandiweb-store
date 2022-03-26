import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CartViewComponent from './views/Cart/CartView.component';
import HomeViewComponent from './views/Home/HomeView.component';
import CategoryViewComponent from './views/Category/CategoryView.component';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<HomeViewComponent />} />
        <Route path="/cart" element={<CartViewComponent />} />
        <Route path="/category/:category" element={<CategoryViewComponent />} />
      </Routes>
    );
  }
}
