import React from 'react';
import './IconButton.style.scss';

export default class IconButtonComponent extends React.Component<IconButtonProps> {
  render() {
    const { icon, ...props } = this.props;
    return (
      <button 
        className='icon-button'
        {...props}
      >
        {this.renderIcon()}
      </button>
    );
  }

  private renderIcon() {
    if(typeof this.props.icon === 'object')
      return this.renderComponent();
    else if(typeof this.props.icon === 'string')
      return this.renderImg();
  }

  private renderComponent() {
    const component = this.props.icon as React.ReactElement<any>;
    return React.cloneElement(component, {
      className: 'icon-button__icon'
    });
  }

  private renderImg() {
    const icon = this.props.icon as string;
    return <img src={icon} className='icon-button__icon' />;
  }
}

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string | React.ReactElement<any>;
}
