import React from 'react';
import { productDataService } from '../../../../services/data/Product/ProductData.service';
import { history } from '../../../app/AppRouter/AppRouter.component';
import NavbarItemComponent from '../NavbarItem/NavbarItem.component';
import NavbarSelectedIndicatorComponent from '../NavbarSelectedIndicator/NavbarSelectedIndicator.component';

export default class NavbarItemsComponent extends React.PureComponent<NavbarItemsProps, NavbarItemsState> {
  private unlisten?: () => void;
  private unlistenCategory?: () => void;

  constructor(props: NavbarItemsProps) {
    super(props);

    this.state = {
      path: history.location.pathname,
      position: 0,
      width: 0
    };
  }

  componentDidMount() {
    this.unlisten = history.listen((update) => this.updateLocation(update.location.pathname));
    this.unlistenCategory = productDataService.currentProductCategory.listen(category => {
      if(category)
        this.updateLocation(`/${category}`);
    });
    setTimeout(() => this.updateLocation(history.location.pathname));
  }

  componentWillUnmount() {
    if(this.unlisten)
      this.unlisten();
    if(this.unlistenCategory)
      this.unlistenCategory();
  }

  private updateLocation(location: string) {
    const activePath = this.props.paths.find(path => this.isSelected(path.path, location));
    const position = activePath?.ref?.getPosition() ?? { 
      position: this.state.position + (this.state.width * 0.5),
      width: 0
    };

    this.setState({
      path: location,
      ...position
    });
  }

  private isSelected(path: string, current: string) {
    return current === path
      || (current.startsWith('/product/') && path === `/${productDataService.currentProductCategory.value}`);
  }

  private isActiveClass(path: string) {
    return this.isSelected(path, this.state.path);
  }

  private setRef(path: NavbarItemsPath) {
    return (ref: NavbarItemComponent) => {
      path.ref = ref;
    };
  }

  render() {
    return (
      <div className='navbar-items'>
        { this.renderItems() }
        <NavbarSelectedIndicatorComponent position={this.state.position} width={this.state.width} />
      </div>
    );
  }

  private renderItems() {
    return this.props.paths.map(path => (
      <NavbarItemComponent ref={this.setRef(path)} title={path.title} path={path.path} key={path.title} active={this.isActiveClass(path.path)} />
    ));
  }
}

export interface NavbarItemsProps {
  paths: NavbarItemsPath[];
}

export interface NavbarItemsState {
  path: string;
  position: number;
  width: number;
}

export interface NavbarItem {
  title: string;
  path: string;
}

export interface NavbarItemsPath extends NavbarItem {
  ref?: NavbarItemComponent;
}
