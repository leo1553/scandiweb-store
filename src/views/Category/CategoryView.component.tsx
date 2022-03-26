import React from 'react';
import { Product } from '../../models/Product.model';
import { productService } from '../../services/data/Product/Product.service';
import { capitalize } from '../../utils/capitalize';
import { RoutedProps, withRouter } from '../../utils/withRouter';

import './CategoryView.style.scss';

class CategoryViewComponent extends React.Component<RoutedProps, CategoryViewState> {
  constructor(props: RoutedProps) {
    super(props);

    this.state = {
      categoryName: '',
      products: undefined
    };
  }

  get category() {
    return this.state.categoryName;
  }

  get header() {
    return this.category ? capitalize(this.category) : 'Category';
  }

  private updateCategory(categoryName: string | undefined) {
    if(categoryName) {
      this.setState({
        categoryName: categoryName,
        products: undefined
      });
      productService.getProducts(categoryName)
        .then(products => {
          this.setState({
            products
          });
        });
    }
  }

  componentDidMount() {
    this.updateCategory(this.props.params.category);
  }

  componentDidUpdate(prevProps: RoutedProps) {
    if(this.props.params.category !== prevProps.params.category) {
      this.updateCategory(this.props.params.category);
    }
  }

  render() {
    if(this.state.products === undefined)
      return this.renderLoading();
    if(this.state.products === null)
      return this.renderError();
    return this.renderContent();
  }

  private renderContent() {
    return (
      <div className='category-view'>
        <span className='category-view__title'>{this.header}</span>
        <p>This is the category view.</p>
      </div>
    );
  }

  private renderLoading() {
    return <div>Loading...</div>;
  }

  private renderError() {
    return <div>Error</div>;
  }
}

export default withRouter(CategoryViewComponent);

export interface CategoryViewState {
  categoryName: string;
  products: Product[] | null | undefined;
}
