import React from 'react';
import { capitalize } from '../../utils/capitalize';
import { RoutedProps, withRouter } from '../../utils/withRouter';

class CategoryViewComponent extends React.Component<RoutedProps> {
  get header() {
    const category = this.props.params.category;
    return category ? capitalize(category) : 'Listing';
  }

  render() {
    return (
      <div>
        <h1>{this.header}</h1>
        <p>This is the category view.</p>
      </div>
    );
  }
}

export default withRouter(CategoryViewComponent);
