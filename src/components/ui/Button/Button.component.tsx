import classNames from 'classnames';
import React from 'react';

import './Button.style.scss';

export class ButtonComponent extends React.Component<ButtonProps> {
  get className() {
    return classNames(
      'button',
      {
        'button--primary': this.props.color === 'primary'
      },
      this.props.className
    );
  }

  render() {
    return (
      <button
        {...this.props}
        className={this.className}
      >
        {this.props.children}
      </button>
    );
  }
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  color?: string;
}
