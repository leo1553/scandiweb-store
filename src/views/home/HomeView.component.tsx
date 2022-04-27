import React from 'react';
import { Navigate } from 'react-router-dom';
import { categoryDataService } from '../../services/data/Category/CategoryData.service';

export default class HomeViewComponent extends React.Component {
  get firstCategory() {
    return categoryDataService.value?.[0]?.name ?? '500';
  }

  render() {
    return (
      <Navigate to={`/${this.firstCategory}`} />
    );
  }
}
