import React from 'react';
import './IconButton.style.scss';

export default class IconButtonComponent extends React.Component<IconButtonProps> {
  render() {
    return (
      <button 
        className='icon-button'
        {...this.props}
      >
        <img src={this.props.icon} className='icon-button__icon' />
      </button>
    );
  }  
}

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
}
