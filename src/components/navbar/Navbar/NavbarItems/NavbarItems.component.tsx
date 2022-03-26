import React from 'react';
import { Location } from 'react-router-dom';
import { history } from '../../../../AppRouter';
import NavbarItemComponent from '../NavbarItem/NavbarItem.component';
import NavbarSelectedIndicatorComponent from '../NavbarSelectedIndicator/NavbarSelectedIndicator.component';

export default class NavbarItemsComponent extends React.Component<NavbarItemsProps, NavbarItemsState> {
  private unlisten?: () => void;

  constructor(props: NavbarItemsProps) {
    super(props);

    this.state = {
      path: history.location.pathname,
      position: 0,
      width: 0
    };
  }

  componentDidMount() {
    this.unlisten = history.listen((update) => this.updateLocation(update.location));
    setTimeout(() => this.updateLocation(history.location));
  }

  componentWillUnmount() {
    if(this.unlisten)
      this.unlisten();
  }

  private updateLocation(location: Location) {
    const activePath = this.props.paths.find(path => path.path === location.pathname);
    const position = activePath?.ref?.getPosition() ?? { position: 0, width: 0 };

    this.setState({
      path: location.pathname,
      ...position
    });
  }

  private isActiveClass(path: string) {
    return this.state.path === path;
  }

  private setRef(path: NavbarItemsPath) {
    return (ref: NavbarItemComponent) => {
      path.ref = ref;
    };
  }

  render() {
    return (
      <div>
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
