import React from 'react';
import { Product } from '../../../models/Product.model';
import { computeNumberStyle } from '../../../utils/computeStyle';
import PaginatorComponent from '../../ui/Paginator/Paginator.component';
import ProductRowComponent from './ProductRow/ProductRow.component';

import './ProductShowcase.style.scss';

export default class ProductShowcaseComponent extends React.PureComponent<ProductShowcaseProps, ProductShowcaseState> {
  static readonly ROW_MARGIN = computeNumberStyle('product-row--with-margin', 'margin-left');
  static readonly CARD_PADDING = computeNumberStyle('card', 'padding');
  static readonly CARD_SIZE = computeNumberStyle('product-card__content', 'width') + this.CARD_PADDING * 2;

  private unlisten?: () => void;
  private rootRef: React.RefObject<HTMLDivElement>;

  constructor(props: ProductShowcaseProps) {
    super(props);

    this.rootRef = React.createRef();

    this.state = {
      countPerRow: 1,
      productsInPage: this.props.products.slice(0, props.itemsPerPage)
    };
  }

  private updateSize() {
    const target = this.rootRef.current!;
    const maxWidth = target.getBoundingClientRect().width;

    const fullCardSize = ProductShowcaseComponent.CARD_SIZE + ProductShowcaseComponent.ROW_MARGIN;
    const count = 1 + Math.max(0, Math.floor((maxWidth - ProductShowcaseComponent.CARD_SIZE) / fullCardSize));

    if(count != this.state.countPerRow) {
      this.setState({
        countPerRow: count
      });
    }
  }

  private pageChange(page: number) {
    const startIndex = (page - 1) * this.props.itemsPerPage;
    this.setState({
      productsInPage: this.props.products.slice(startIndex, startIndex + this.props.itemsPerPage)
    });
  }

  componentDidMount() {
    this.unlisten = this.updateSize.bind(this);
    window.addEventListener('resize', this.unlisten);
    this.updateSize();
  }

  componentWillUnmount() {
    if(this.unlisten)
      window.removeEventListener('resize', this.unlisten);
  }

  render() {
    return (
      <div
        ref={this.rootRef}
        className='product-showcase'
      >
        <div className='product-showcase__rows'>
          {this.renderRows()}
        </div>
        <div className='product-showcase__paginator'>
          <PaginatorComponent
            items={this.props.products.length}
            itemsPerPage={this.props.itemsPerPage}
            onChange={(page) => this.pageChange(page)}
          />
        </div>
      </div>
    );
  }

  private renderRows() {
    const rows: Product[][] = [];
    this.state.productsInPage.forEach(
      (current, index) => {
        const row = Math.floor(index / this.state.countPerRow);
        if(!rows[row])
          rows[row] = [];
        rows[row].push(current);
      }
    );

    return rows.map((row, index) => (
      <ProductRowComponent key={index} products={row} />
    ));
  }
}

export interface ProductShowcaseProps {
  products: Product[];
  itemsPerPage: number;
}

export interface ProductShowcaseState {
  productsInPage: Product[];
  countPerRow: number;
}
