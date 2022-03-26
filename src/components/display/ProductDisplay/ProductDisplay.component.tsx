import React from 'react';
import { Product } from '../../../models/Product.model';
import { computeNumberStyle } from '../../../utils/computeStyle';
import ProductRowComponent from '../ProductRow/ProductRow.component';

import './ProductDisplay.style.scss';

export default class ProductDisplayComponent extends React.Component<ProductDisplayProps, ProductDisplayState> {
  static readonly ROW_MARGIN = computeNumberStyle('product-row--with-margin', 'margin-left');
  static readonly CARD_PADDING = computeNumberStyle('card', 'padding');
  static readonly CARD_SIZE = computeNumberStyle('product-card', 'width') + this.CARD_PADDING * 2;

  private unlisten?: () => void;
  private rootRef: React.RefObject<HTMLDivElement>;

  constructor(props: ProductDisplayProps) {
    super(props);

    this.rootRef = React.createRef();

    this.state = {
      countPerRow: 1
    };
  }

  private updateSize() {
    const target = this.rootRef.current!;
    const maxWidth = target.getBoundingClientRect().width;

    const fullCardSize = ProductDisplayComponent.CARD_SIZE + ProductDisplayComponent.ROW_MARGIN;
    const count = 1 + Math.max(0, Math.floor((maxWidth - ProductDisplayComponent.CARD_SIZE) / fullCardSize));

    if(count != this.state.countPerRow) {
      this.setState({
        countPerRow: count
      });
    }
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
        className='product-display'
      >
        <div className='product-display__rows'>
          {this.renderRows()}
        </div>
      </div>
    );
  }

  private renderRows() {
    const rows = this.props.products.reduce(
      (previous, current, index) => {
        const row = Math.floor(index / this.state.countPerRow);
        if(!previous[row])
          previous[row] = [];
        previous[row].push(current);
        return previous;
      },
      [] as Product[][]
    );

    return rows.map((row, index) => (
      <ProductRowComponent key={index} products={row} />
    ));
  }
}

export interface ProductDisplayProps {
  products: Product[];
}

export interface ProductDisplayState {
  countPerRow: number;
}
