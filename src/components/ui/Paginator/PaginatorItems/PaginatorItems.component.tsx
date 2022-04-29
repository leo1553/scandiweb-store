import React from 'react';
import { createArray } from '../../../../utils/createArray';
import PaginatorDotsComponent from '../PaginatorDots/PaginatorDots.component';
import PaginatorItemComponent from '../PaginatorItem/PaginatorItem.component';

import './PaginatorItems.style.scss';

export default class PaginatorItemsComponent extends React.PureComponent<PaginatorItemsProps> {
  render() {
    return (
      <div className='paginator-items'>
        {this.renderItems()}
      </div>
    );
  }

  private renderItems() {
    if(this.props.pages < 7) 
      return this.renderSimple();
    else
      return this.renderComplex();
  }

  private renderSimple() {
    return createArray(this.props.pages, (index) => this.renderItem(index + 1));
  }

  private renderComplex() {
    const pagesToRender = this.getPagesToRender();
    return pagesToRender.map(page => this.renderItem(page));
  }

  private renderItem(page: number | null) {
    if(page != null) {
      return <PaginatorItemComponent 
        key={page}
        page={page}
        selected={this.props.currentPage === page}
        disabled={this.props.disabled}
        readonly={this.props.readonly}
        onClick={(event) => this.props.onItemClick?.(page, event)}
      />;
    }
    else {
      return <PaginatorDotsComponent />;
    }
  }

  private getPagesToRender() {
    // TODO: use constants instead of hardcoded values
    const shouldRenderSecondPage = this.props.currentPage < 5;
    const shouldRenderSecondToLastPage = this.props.currentPage > this.props.pages - 4;
    
    let middlePages;
    if(shouldRenderSecondPage)
      middlePages = [3, 4, 5];
    else if(shouldRenderSecondToLastPage)
      middlePages = [this.props.pages - 4, this.props.pages - 3, this.props.pages - 2];
    else
      middlePages = [this.props.currentPage - 1, this.props.currentPage, this.props.currentPage + 1];

    return [
      1,
      shouldRenderSecondPage ? 2 : null,
      ...middlePages,
      shouldRenderSecondToLastPage ? this.props.pages - 1 : null,
      this.props.pages
    ];
  }
}

export interface PaginatorItemsProps {
  pages: number;
  currentPage: number;
  disabled: boolean;
  readonly: boolean;
  onItemClick?: (page: number, event: React.MouseEvent) => void;
}
