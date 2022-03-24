import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeViewComponent from './views/home/HomeView.component';

export default class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeViewComponent />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
