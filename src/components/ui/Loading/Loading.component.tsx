import React from 'react';

import './Loading.style.scss';
import { ReactComponent as Loading } from '../../../assets/icons/loading.svg';

export default class LoadingComponent extends React.Component<LoadingProps> {
  get size() {
    return this.props.size ?? 64;
  }

  render() {
    return (
      <Loading className='loading' style={{ width: this.size, height: this.size }} />
    );
  }
}

export interface LoadingProps {
  size?: number;
}
