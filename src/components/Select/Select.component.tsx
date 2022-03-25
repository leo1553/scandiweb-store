import React, { createRef, MouseEvent, RefObject } from 'react';
import SelectOverlayComponent from './SelectOverlay/SelectOverlay.component';
import './Select.style.scss';
import { OptionProps } from '../Option/Option.component';

export default class SelectComponent extends React.Component<SelectProps, SelectState> {
  private rootRef: RefObject<HTMLDivElement>;
  private windowResizeListener: () => void;

  constructor(props: SelectProps) {
    super(props);

    this.state = {
      open: false,
      selectedIndex: props.selectedIndex ?? -1,
      left: 0,
      top: 0,
      width: 0
    };

    this.rootRef = createRef();

    this.windowResizeListener = () => {
      if(this.state.open) 
        this.setState(this.getPosition());
    };
  }

  private get displayValue() {
    const existingChildren = this.props.children ?? [];
    const children = Array.isArray(existingChildren) ? existingChildren : [existingChildren];
    if(this.state.selectedIndex > -1 && this.state.selectedIndex < children.length) 
      return children[this.state.selectedIndex].props.name;
    return this.props.placeholder;
  }

  private get selectContainerClassName() {
    if(this.props.disabled)
      return 'select__container--disabled';
    else if(this.props.readonly)
      return 'select__container--readonly';
    return '';
  }

  private get selectIconClassName() {
    const classes: string[] = [];
    if(this.state.open)
      classes.push('select__icon--open');
    if(!this.props.disabled && this.props.readonly)
      classes.push('select__icon--readonly');
    return classes.join(' ');
  }

  private getPosition() {
    const target = this.rootRef.current!;
    const targetRect = target.getBoundingClientRect();

    return {
      left: targetRect.left,
      top: targetRect.top + targetRect.height,
      width: targetRect.width
    };
  }

  private setOpen(open: boolean, event?: React.MouseEvent) {
    if(open && (this.props.disabled || this.props.readonly))
      return;

    const position = this.getPosition();
    this.setState({
      open,
      ...position
    });
    event?.stopPropagation();
  }

  private valueClick(value: unknown, index: number, event: MouseEvent) {
    if(this.props.disabled || this.props.readonly)
      return;

    this.setState({
      selectedIndex: index,
      open: false
    });
    this.props.onChange?.(value, index);
    event.stopPropagation();
  }

  componentDidMount() {
    window.addEventListener('resize', this.windowResizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResizeListener);
  }

  render() {
    return (
      <div
        className='select'
        ref={this.rootRef}
        tabIndex={0}
        onClick={(event) => this.setOpen(true, event)}
      >
        <div className={`select__container ${this.selectContainerClassName}`}>
          <span className='select__value'>
            {this.displayValue}
          </span>
          <img className={`select__icon ${this.selectIconClassName}`} src='/img/arrow-down.svg' />
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
          onOptionClick={(value, index, event) => this.valueClick(value, index, event)}
          left={this.state.left}
          top={this.state.top}
          width={this.state.width}
          selectedIndex={this.state.selectedIndex}
        >
          {this.props.children}
        </SelectOverlayComponent>
      );
    }
  }
}

export interface SelectProps {
  children?: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  selectedIndex?: number;
  onChange?: (value: unknown, index: number) => void;
}

export interface SelectState {
  open: boolean;
  selectedIndex: number;
  left: number;
  top: number;
  width: number;
}
