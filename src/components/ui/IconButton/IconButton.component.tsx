import React from 'react';
import { ButtonComponent, ButtonProps } from '../Button/Button.component';
import './IconButton.style.scss';

export default class IconButtonComponent extends React.PureComponent<IconButtonProps> {
  private get className() {
    const classes = ['icon-button'];
    if(this.props.className)
      classes.push(this.props.className);
    return classes.join(' ');
  }

  render() {
    const { icon, ...props } = this.props;
    return (
      <ButtonComponent
        {...props}
        className={this.className}
      >
        {this.renderIcon()}
      </ButtonComponent>
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

export interface IconButtonProps extends ButtonProps {
  icon: string | React.ReactElement<any>;
}
