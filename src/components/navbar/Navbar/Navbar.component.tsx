import React from 'react';
import { Category } from '../../../models/Category.model';
import { categoryDataService } from '../../../services/data/Category/CategoryData.service';
import NavbarButtonsComponent from './NavbarButtons/NavbarButtons.component';
import NavbarItemsComponent, { NavbarItem } from './NavbarItems/NavbarItems.component';

import './Navbar.style.scss';
import logo from '../../../assets/img/logo.svg';
import classNames from 'classnames';

export default class NavbarComponent extends React.PureComponent<unknown, NavbarState> {
  private unlisten?: () => void;

  constructor(props: unknown) {
    super(props);

    this.state = {
      paths: [],
      shadow: false
    };
    this.checkShadow = this.checkShadow.bind(this);
  }

  get className() {
    return classNames(
      'navbar',
      {
        'navbar--shadow': this.state.shadow
      }
    );
  }

  private onCategoriesChange(categories: Category[] | null | undefined) {
    if(!categories) 
      return;
    this.setState({
      paths: categories.map((category) => ({
        title: category.name,
        path: `/${category.name.toLowerCase()}`
      }))
    });
  }

  componentDidMount() {
    this.unlisten = categoryDataService.listen(
      (data) => this.onCategoriesChange(data),
      true
    );
    window.addEventListener('scroll', this.checkShadow);
  }

  componentWillUnmount() {
    this.unlisten?.();
    window.removeEventListener('scroll', this.checkShadow);
  }

  private checkShadow() {
    const shouldDisplayShadow = window.scrollY > 0;
    if(shouldDisplayShadow !== this.state.shadow) {
      this.setState({
        shadow: shouldDisplayShadow
      });
    }
  }

  render() {
    return (
      <div className={this.className}>
        <div className='navbar__container'>
          <NavbarItemsComponent paths={this.state.paths} />
        </div>
        <img className='navbar__logo' src={logo} />
        <div className='navbar__container navbar__container--right'>
          <NavbarButtonsComponent></NavbarButtonsComponent>
        </div>
      </div>
    );
  }
}

export interface NavbarState {
  paths: NavbarItem[];
  shadow: boolean;
}
