import React from 'react';
import { Link, Location } from 'react-router-dom';
import { RoutedProps, withRouter } from '../../../utils/withRouter';
import IconButtonComponent from '../../ui/IconButton/IconButton.component';
import classNames from 'classnames';
import { history } from '../../app/AppRouter/AppRouter.component';

import './CartButton.style.scss';
import { ReactComponent as Cart } from '../../../assets/icons/cart.svg';

class CartButtonComponent extends React.PureComponent<RoutedProps, CartButtonState> {
  private unlisten?: () => void;

  constructor(props: RoutedProps) {
    super(props);

    this.state = {
      selected: false
    };
  }

  private get className() {
    return classNames(
      'cart-button',
      {
        'cart-button--selected': this.state.selected
      });
  }

  private updateLocation(location: Location) {
    this.setState({
      selected: location.pathname === '/cart'
    });
  }

  componentDidMount() {
    this.unlisten = history.listen((update) => this.updateLocation(update.location));
    this.updateLocation(history.location);
  }

  componentWillUnmount() {
    this.unlisten?.();
  }

  render() {
    return (
      <Link to='/cart'>
        <IconButtonComponent className={this.className} icon={<Cart />} />
      </Link>
    );
  }
}

export default withRouter(CartButtonComponent);

export interface CartButtonState {
  selected: boolean;
}
