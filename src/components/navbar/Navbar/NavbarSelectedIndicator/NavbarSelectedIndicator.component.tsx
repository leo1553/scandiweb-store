import React from 'react';
import './NavbarSelectedIndicator.style.scss';

export default class NavbarSelectedIndicatorComponent extends React.Component<NavbarSelectedIndicatorProps> {
  constructor(props: NavbarSelectedIndicatorProps) {
    super(props);
  }

  render() {
    return (
      <div 
        className='navbar-selected-indicator'
        style={{
          left: `${this.props.position}px`,
          width: `${this.props.width}px`
        }}
      ></div>
    );
  }
}

export interface NavbarSelectedIndicatorProps {
  position: number;
  width: number;
}
