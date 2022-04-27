import classNames from 'classnames';
import React, { createRef, RefObject} from 'react';
import { Link } from 'react-router-dom';
import './NavbarItem.style.scss';

export default class NavbarItemComponent extends React.Component<NavbarItemProps> {
  private anchorRef: RefObject<HTMLAnchorElement>;

  constructor(props: NavbarItemProps) {
    super(props);

    this.anchorRef = createRef();
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
    return classNames(
      'navbar-item',
      {
        'navbar-item--active': this.props.active
      }
    );
  }

  render() {
    const title = this.props.title.toUpperCase();
    return (
      <Link
        to={this.props.path}
        className={this.activeClassName}
        ref={this.anchorRef}
      >
        <span
          className='navbar-item__title'
          aria-label={title}
        >
          {title}
        </span>
      </Link>
    );
  }
}

export interface NavbarItemProps {
  title: string;
  path: string;
  active: boolean;
}

export interface NavbarItemPosition {
  position: number;
  width: number;
}
