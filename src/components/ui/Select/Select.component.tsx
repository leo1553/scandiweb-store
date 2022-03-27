import React, { createRef, MouseEvent, RefObject } from 'react';
import SelectOverlayComponent from './SelectOverlay/SelectOverlay.component';
import { OptionProps } from '../Option/Option.component';

import './Select.style.scss';
import { ReactComponent as ArrowDown } from '../../../assets/icons/arrow-down.svg';
import classNames from 'classnames';
import SelectItemsComponent from './SelectItems/SelectItems.component';
import { ControlProps } from '../../common/props/ControlProps';

export default class SelectComponent extends React.Component<SelectProps, SelectState> {
  private rootRef: RefObject<HTMLDivElement>;

  constructor(props: SelectProps) {
    super(props);

    this.state = {
      open: false,
      selectedIndex: props.value ?? -1
    };

    this.rootRef = createRef();
  }

  private get displayValue() {
    const existingChildren = this.props.children ?? [];
    const children = Array.isArray(existingChildren) ? existingChildren : [existingChildren];
    if(this.state.selectedIndex > -1 && this.state.selectedIndex < children.length) 
      return children[this.state.selectedIndex].props.label;
    return this.props.placeholder;
  }

  private get selectContainerClassName() {
    return classNames(
      'select__container',
      {
        'select__container--disabled': this.props.disabled,
        'select__container--readonly': this.props.readonly
      }
    );
  }

  private get selectValueClassName() {
    return classNames(
      'select__value',
      {
        'select__value--placeholder': this.state.selectedIndex === -1
      }
    );
  }

  private get selectIconClassName() {
    return classNames(
      'select__icon', 
      {
        'select__icon--open': this.state.open,
        'select__icon--readonly': !this.props.disabled && this.props.readonly
      }
    );
  }

  private get canChangeValue() {
    return !this.props.disabled && !this.props.readonly;
  }

  private setOpen(open: boolean, event?: React.MouseEvent) {
    if(open && !this.canChangeValue)
      return;

    this.setState({ open });
    event?.stopPropagation();
  }

  private valueClick(value: unknown, index: number, event: MouseEvent) {
    if(!this.canChangeValue || index === this.state.selectedIndex) {
      this.setState({ open: false });
    }

    this.setState({
      selectedIndex: index,
      open: false
    });
    this.props.onChange?.({
      value,
      index
    });
    event.stopPropagation();
  }

  render() {
    return (
      <div
        className='select'
        ref={this.rootRef}
        tabIndex={0}
        onClick={(event) => this.setOpen(true, event)}
      >
        <div className={this.selectContainerClassName}>
          <span className={this.selectValueClassName}>
            {this.displayValue}
          </span>
          <ArrowDown className={this.selectIconClassName} />
        </div>
        {this.renderOverlay()}
      </div>
    );
  }

  private renderOverlay() {
    if(this.state.open) {
      return (
        <SelectOverlayComponent
          onOutsideClick={(event) => this.setOpen(false, event)}
          anchor={this.rootRef}
        >
          <SelectItemsComponent
            onOptionClick={(value, index, event) => this.valueClick(value, index, event)}
            selectedIndex={this.state.selectedIndex}
          >
            {this.props.children}
          </SelectItemsComponent>
        </SelectOverlayComponent>
      );
    }
  }
}

export interface SelectProps extends ControlProps<number, SelectChangeEvent> {
  children?: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
}

export interface SelectState {
  open: boolean;
  selectedIndex: number;
}

export interface SelectChangeEvent { 
  value: unknown;
  index: number;
}
