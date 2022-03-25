import React, { MouseEvent } from 'react';
import { OptionProps } from '../../Option/Option.component';
import './SelectOption.style.scss';

export default class SelectOptionComponent extends React.Component<SelectOptionProps> {
  get disabled() {
    const child = this.props.children;
    return child && child.props.disabled;
  }

  get selectOptionClassName() {
    if(this.disabled) 
      return 'select-option--disabled';
    return '';
  }

  private onClick(event: MouseEvent) {
    const option = this.props.children;
    if (option && !this.disabled) {
      this.props.onClick(option.props.value, event);
    }
    event.stopPropagation();
  }

  render() {
    return (
      <div
        className={`select-option ${this.selectOptionClassName}`}
        onClick={(event) => this.onClick(event)}
      >
        {this.props.children}
      </div>
    );
  }
}

export interface SelectOptionProps {
  children?: React.ReactElement<OptionProps>;
  onClick: (value: unknown, event: MouseEvent) => void;
}
