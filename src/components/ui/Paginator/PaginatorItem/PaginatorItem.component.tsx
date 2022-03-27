import classNames from 'classnames';
import React from 'react';

import './PaginatorItem.style.scss';

export default class PaginatorItemComponent extends React.Component<PaginatorItemProps> {
  private get paginatorItemClassName() {
    return classNames(
      'paginator-item',
      {
        'paginator-item--selected': this.props.selected,
        'paginator-item--disabled': this.props.disabled,
        'paginator-item--readonly': this.props.readonly
      }
    );
  }

  private get paginatorItemValueClassName() {
    return classNames(
      'paginator-item__value',
      {
        'paginator-item__value--selected': this.props.selected,
        'paginator-item__value--disabled': this.props.disabled
      }
    );
  }

  render() {
    return (
      <div
        tabIndex={0}
        className={this.paginatorItemClassName}
        onClick={this.props.onClick}
      >
        <span className={this.paginatorItemValueClassName}>
          {this.props.page}
        </span>
      </div>
    );
  }
}

export interface PaginatorItemProps {
  page: number;
  selected: boolean;
  disabled: boolean;
  readonly: boolean;
  onClick?: (event: React.MouseEvent) => void;
}
