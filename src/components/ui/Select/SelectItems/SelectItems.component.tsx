import React from 'react';
import { OptionProps } from '../../Option/Option.component';
import SelectOptionComponent from '../SelectOption/SelectOption.component';

import './SelectItems.style.scss';

export default class SelectItemsComponent extends React.Component<SelectItemsProps> {
  private onClick(event: React.MouseEvent) {
    event.stopPropagation();
  }

  render() {
    return (
      <div
        onClick={(event) => this.onClick(event)}
        className='select-items'
      >
        {this.renderChildren()}
      </div>
    );
  }

  private renderChildren() {
    if(this.props.children) {
      const children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
      return children.map((child, index) => (
        <SelectOptionComponent onClick={(value, event) => this.props.onOptionClick(value, index, event)} key={index}>
          {child}
        </SelectOptionComponent>
      ));
    }
  }
}

export interface SelectItemsProps {
  children?: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
  selectedIndex: number;
  onOptionClick: (value: unknown, index: number, event: React.MouseEvent) => void;
}
