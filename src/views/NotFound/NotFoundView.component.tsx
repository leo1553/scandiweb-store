import React from 'react';
import ErrorComponent from '../../components/ui/Error/Error.component';
import { RoutedProps, withRouter } from '../../utils/withRouter';

import './NotFoundView.style.scss';

class NotFoundViewComponent extends React.PureComponent<RoutedProps> {
  handleClick() {
    this.props.navigate('/');
  }

  render() {
    return (
      <div className="not-found">
        <ErrorComponent
          code='💔'
          header='Page not found'
          message='The page you are looking for does not exist.'
          goBack={() => this.handleClick()}
        ></ErrorComponent>
      </div>
    );
  }
}

export default withRouter(NotFoundViewComponent);
