import React from 'react';
import { capitalize } from '../../utils/capitalize';
import { RoutedProps, withRouter } from '../../utils/withRouter';

class ListingViewComponent extends React.Component<RoutedProps> {
  get header() {
    const category = this.props.params.category;
    return category ? capitalize(category) : 'Listing';
  }

  render() {
    return (
      <div>
        <h1>{this.header}</h1>
        <p>This is the listing view.</p>
      </div>
    );
  }
}

export default withRouter(ListingViewComponent);
