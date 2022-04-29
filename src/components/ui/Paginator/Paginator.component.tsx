import React from 'react';
import PaginatorButtonComponent from './PaginatorButton/PaginatorButton.component';
import PaginatorItemsComponent from './PaginatorItems/PaginatorItems.component';

import './Paginator.style.scss';
import { ControlProps } from '../../common/props/ControlProps';

export default class PaginatorComponent extends React.PureComponent<PaginatorProps, PaginatorState> {
  static readonly DEFAULT_ITEMS_PER_PAGE = 10;
  
  constructor(props: PaginatorProps) {
    super(props);

    this.state = {
      currentPage: props.value ?? 1
    };
  }

  get pages() {
    return Math.ceil(this.props.items / (this.props.itemsPerPage ?? PaginatorComponent.DEFAULT_ITEMS_PER_PAGE));
  }

  private get canEmitChange() {
    return !this.props.disabled && !this.props.readonly;
  }

  private onItemClick(page: number, event: React.MouseEvent) {
    event.stopPropagation();
    if(!this.canEmitChange)
      return;
    this.setPage(page);
  }

  private onArrowClick(modifier: number, event: React.MouseEvent) {
    event.stopPropagation();
    if(!this.canEmitChange)
      return;
    this.setPage(this.state.currentPage + modifier);
  }

  private setPage(page: number) {
    if(page < 1 || page > this.pages)
      return;
    this.setState({ currentPage: page });
    this.props.onChange?.(page);
  }

  render() {
    return (
      <div className='paginator'>
        <PaginatorButtonComponent
          side='left'
          onClick={(event) => this.onArrowClick(-1, event)}
          disabled={!this.canEmitChange || this.state.currentPage === 1}
        />
        <PaginatorItemsComponent
          pages={this.pages}
          currentPage={this.state.currentPage}
          disabled={this.props.disabled ?? false}
          readonly={this.props.readonly ?? false}
          onItemClick={(page, event) => this.onItemClick(page, event)}
        />
        <PaginatorButtonComponent
          side='right'
          onClick={(event) => this.onArrowClick(+1, event)}
          disabled={!this.canEmitChange || this.state.currentPage === this.pages}
        />
      </div>
    );
  }
}

export interface PaginatorProps extends ControlProps<number, number> {
  items: number;
  itemsPerPage?: number;
}

export interface PaginatorState {
  currentPage: number;
}
