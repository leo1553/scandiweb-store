import React, { MouseEvent } from 'react';
import { OptionProps } from '../../Option/Option.component';
import OverlayComponent from '../../Overlay/Overlay.component';
import SelectOptionComponent from '../SelectOption/SelectOption.component';
import './SelectOverlay.style.scss';

export default class SelectOverlayComponent extends React.Component<SelectOverlayProps> {
  private onClick(event: MouseEvent) {
    event.stopPropagation();
  }

  render() {
    return (
      <OverlayComponent onClick={this.props.onOutsideClick}>
        <div
          onClick={(event) => this.onClick(event)}
          className='select-overlay'
          style={{ left: this.props.left, top: this.props.top, minWidth: this.props.width }}
        >
          <div className='select-overlay__container'>
            {this.renderChildren()}
          </div>
        </div>
      </OverlayComponent>
    );
  }

  renderChildren() {
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

export interface SelectOverlayProps {
  children?: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
  left: number;
  top: number;
  width: number;
  selectedIndex: number;
  onOutsideClick: (event: MouseEvent) => void;
  onOptionClick: (value: unknown, index: number, event: MouseEvent) => void;
}
