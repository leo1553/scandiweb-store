import React from 'react';

export default class ImageComponent extends React.Component<ImageProps> {
  render() {
    return (
      <div 
        {...this.props}
        style={{ 
          ...this.props.style,
          backgroundImage: `url(${this.props.source})`
        }}
      />
    );
  }
}

export interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
  source: string;
}
