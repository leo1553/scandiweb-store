import React from 'react';
import { Navigate } from 'react-router-dom';
import { categoryService } from '../../services/data/Category/Category.service';

export default class HomeViewComponent extends React.Component {
  get firstCategory() {
    return categoryService.value?.[0].name ?? '';
  }

  render() {
    return (
      <Navigate to={`/category/${this.firstCategory}`} />
    );
  }
}
