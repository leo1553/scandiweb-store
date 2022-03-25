import React, { createRef, RefObject} from 'react';
import { Link } from 'react-router-dom';
import './NavbarItem.style.scss';

export default class NavbarItemComponent extends React.Component<NavbarItemProps, NavbarItemState> {
  private anchorRef: RefObject<HTMLAnchorElement>;

  constructor(props: NavbarItemProps) {
    super(props);

    this.anchorRef = createRef();

    this.state = {};
  }

  componentDidMount() {
    const position = this.getPosition();
    this.setState({
      width: position.width * 1.05
    });
  }

  getPosition(): NavbarItemPosition {
    const target = this.anchorRef.current!;
    const targetRect = target.getBoundingClientRect();

    const parent = target.parentElement!;
    const parentRect = parent.getBoundingClientRect();

    return {
      position: targetRect.left - parentRect.left,
      width: targetRect.width
    };
  }

  private get activeClassName() {
    if(this.props.active)
      return 'navbar-item--active';
    return '';
  }

  render() {
    return (
      <Link
        to={this.props.path}
        className={`navbar-item ${this.activeClassName}`}
        ref={this.anchorRef}
        style={{ minWidth: this.state.width }}
      >
        {this.props.title.toUpperCase()}
      </Link>
    );
  }
}

export interface NavbarItemProps {
  title: string;
  path: string;
  active: boolean;
}

export interface NavbarItemState {
  width?: number;
}

export interface NavbarItemPosition {
  position: number;
  width: number;
}
