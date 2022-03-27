import React from 'react';
import IconButtonComponent from '../../IconButton/IconButton.component';
import { ReactComponent as ArrowLeft } from '../../../../assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../../assets/icons/arrow-right.svg';

export default class PaginatorButtonComponent extends React.Component<PaginatorButton> {
  render() {
    return <IconButtonComponent icon={this.renderIcon()} onClick={this.props.onClick} disabled={this.props.disabled} />;
  }

  private renderIcon() {
    if(this.props.side === 'left')
      return this.renderLeftIcon();
    else
      return this.renderRightIcon();
  }

  private renderLeftIcon() {
    return <ArrowLeft />;
  }

  private renderRightIcon() {
    return <ArrowRight />;
  }
}

export interface PaginatorButton {
  onClick?: (event: React.MouseEvent) => void;
  side: 'left' | 'right';
  disabled: boolean;
}
