import React from 'react';

import './Card.style.scss';

export default class CardComponent extends React.Component<CardProps> {
  get className() {
    const classes = ['card'];
    if(this.props.className)
      classes.push(this.props.className);
    return classes.join(' ');
  }

  render() {
    return (
      <div {...this.props} className={this.className}>
        {this.props.children}
      </div>
    );
  }
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
