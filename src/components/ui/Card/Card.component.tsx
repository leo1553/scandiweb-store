import React from 'react';
import { ChildrenProp } from '../../common/props/ChildrenProp.model';

export default class CardComponent extends React.Component<ChildrenProp> {
  render() {
    return (
      <div className='card'>
        {this.props.children}
      </div>
    );
  }
}
