import classNames from 'classnames';
import React from 'react';
import { OptionProps } from '../../Option/Option.component';

import './SelectOption.style.scss';

export default class SelectOptionComponent extends React.Component<SelectOptionProps> {
  get disabled() {
    const child = this.props.children;
    return child && child.props.disabled;
  }

  get selectOptionClassName() {
    return classNames(
      'select-option',
      {
        'select-option--disabled': this.disabled
      }
    );
  }

  private onClick(event: React.MouseEvent) {
    const option = this.props.children;
    if (option && !this.disabled) {
      this.props.onClick(option.props.value, event);
    }
    event.stopPropagation();
  }

  render() {
    return (
      <div
        className={this.selectOptionClassName}
        onClick={(event) => this.onClick(event)}
      >
        {this.props.children}
      </div>
    );
  }
}

export interface SelectOptionProps {
  children?: React.ReactElement<OptionProps>;
  onClick: (value: unknown, event: React.MouseEvent) => void;
}
