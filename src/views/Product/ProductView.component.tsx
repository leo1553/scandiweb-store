import React from 'react';
import { Navigate } from 'react-router-dom';
import ProductComponent from '../../components/product/Product/Product.component';
import LoadingComponent from '../../components/ui/Loading/Loading.component';
import { Product } from '../../models/Product.model';
import { productDataService } from '../../services/data/Product/ProductData.service';
import { RoutedProps, withRouter } from '../../utils/withRouter';

import './ProductView.style.scss';

class ProductViewComponent extends React.PureComponent<RoutedProps, ProductViewState> {
  constructor(props: RoutedProps) {
    super(props);

    this.state = {
      product: undefined
    };
  }

  private updateCategory(productId: string | undefined) {
    if(productId) {
      this.setState({
        product: undefined
      });
      productDataService.getProduct(productId)
        .then(product => {
          this.setState({
            product
          });
          productDataService.currentProductCategory.notify(product?.category);
        });
    }
    else {
      productDataService.currentProductCategory.notify(undefined);
    }
  }

  componentDidMount() {
    this.updateCategory(this.props.params.productId);
  }

  componentWillUnmount() {
    productDataService.currentProductCategory.notify(undefined);
  }

  componentDidUpdate(prevProps: RoutedProps) {
    if(this.props.params.productId !== prevProps.params.productId) {
      this.updateCategory(this.props.params.productId);
    }
  }

  render() {
    return (      
      <div className='product-view'>
        {this.renderState()}
      </div>
    );
  }

  private renderState() {
    if(this.state.product === undefined)
      return this.renderLoading();
    if(this.state.product === null)
      return this.renderError();
    return this.renderContent();
  }

  private renderContent() {
    return (
      <div className='product-view__display'>
        { this.renderProduct() }
      </div>
    );
  }

  private renderProduct() {
    return <ProductComponent product={this.state.product!} />;
  }

  private renderLoading() {
    return (
      <div className='product-view__loading'>
        <LoadingComponent />
      </div>
    );
  }

  private renderError() {
    return <Navigate to='/404' replace={true} />;
  }
}

export default withRouter(ProductViewComponent);

export interface ProductViewState {
  product: Product | null | undefined;
}
