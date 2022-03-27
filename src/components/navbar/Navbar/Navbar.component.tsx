import React from 'react';
import { Category } from '../../../models/Category.model';
import { categoryDataService } from '../../../services/data/Category/CategoryData.service';
import NavbarButtonsComponent from './NavbarButtons/NavbarButtons.component';
import NavbarItemsComponent, { NavbarItem } from './NavbarItems/NavbarItems.component';

import './Navbar.style.scss';

export default class NavbarComponent extends React.Component<unknown, NavbarState> {
  private unlisten?: () => void;

  constructor(props: unknown) {
    super(props);

    this.state = {
      paths: []
    };
  }

  private onCategoriesChange(categories: Category[] | null | undefined) {
    if(!categories) 
      return;
    this.setState({
      paths: categories.map((category) => ({
        title: category.name,
        path: `/category/${category.name.toLowerCase()}`
      }))
    });
  }

  componentDidMount() {
    this.unlisten = categoryDataService.listen(
      (data) => this.onCategoriesChange(data),
      true
    );
  }

  componentWillUnmount() {
    this.unlisten?.();
  }

  render() {
    return (
      <div className='navbar'>
        <div className='navbar__container'>
          <NavbarItemsComponent paths={this.state.paths} />
        </div>
        <img className='navbar__logo' src='/img/logo.svg' />
        <div className='navbar__container navbar__container--right'>
          <NavbarButtonsComponent></NavbarButtonsComponent>
        </div>
      </div>
    );
  }
}

export interface NavbarState {
  paths: NavbarItem[];
}
