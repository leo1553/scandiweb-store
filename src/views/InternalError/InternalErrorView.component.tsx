import React from 'react';
import ErrorComponent from '../../components/ui/Error/Error.component';
import { RoutedProps, withRouter } from '../../utils/withRouter';
import './InternalErrorView.style.scss';

class InternalErrorViewComponent extends React.Component<RoutedProps> {
  handleClick() {
    this.props.navigate('/');
  }

  render() {
    return (
      <div className="not-found">
        <ErrorComponent
          code='😭'
          header='Something went wrong'
          message='Looks like something went wrong.'
          retry={() => this.handleClick()}
        ></ErrorComponent>
      </div>
    );
  }
}

export default withRouter(InternalErrorViewComponent);
