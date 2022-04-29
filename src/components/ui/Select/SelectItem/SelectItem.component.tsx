import classNames from 'classnames';
import React from 'react';
import { OptionProps } from '../../Option/Option.component';

import './SelectItem.style.scss';

export default class SelectItemComponent extends React.PureComponent<SelectItemProps> {
  get disabled() {
    const child = this.props.children;
    return child && child.props.disabled;
  }

  get SelectItemClassName() {
    return classNames(
      'select-item',
      {
        'select-item--disabled': this.disabled,
        'select-item--selected': this.props.selected
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
        tabIndex={0}
        className={this.SelectItemClassName}
        onClick={(event) => this.onClick(event)}
      >
        {this.props.children}
      </div>
    );
  }
}

export interface SelectItemProps {
  children?: React.ReactElement<OptionProps>;
  selected: boolean;
  onClick: (value: unknown, event: React.MouseEvent) => void;
}
