import React from 'react';
import { Navigate } from 'react-router-dom';
import ProductShowcaseComponent from '../../components/product/ProductShowcase/ProductShowcase.component';
import LoadingComponent from '../../components/ui/Loading/Loading.component';
import { Product } from '../../models/Product.model';
import { productDataService } from '../../services/data/Product/ProductData.service';
import { capitalize } from '../../utils/capitalize';
import { RoutedProps, withRouter } from '../../utils/withRouter';

import './CategoryView.style.scss';

class CategoryViewComponent extends React.PureComponent<RoutedProps, CategoryViewState> {
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
      productDataService.getProducts(categoryName)
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
    return (
      <div className='category-view'>
        <span className='category-view__title'>{this.header}</span>
        {this.renderState()}
      </div>
    );
  }

  private renderState() {
    if(this.state.products === undefined)
      return this.renderLoading();
    if(this.state.products === null)
      return this.renderError();
    return this.renderContent();
  }

  private renderContent() {
    return (
      <div className='category-view__showcase'>
        { this.renderProducts() }
      </div>
    );
  }

  private renderProducts() {
    return <ProductShowcaseComponent products={this.state.products!} itemsPerPage={12} />;
  }

  private renderLoading() {
    return (
      <div className='category-view__loading'>
        <LoadingComponent />
      </div>
    );
  }

  private renderError() {
    return <Navigate to='/404' replace={true} />;
  }
}

export default withRouter(CategoryViewComponent);

export interface CategoryViewState {
  categoryName: string;
  products: Product[] | null | undefined;
}
