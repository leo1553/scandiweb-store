import React from 'react';
import './Overlay.style.scss';

export default class OverlayComponent extends React.Component<OverlayProps> {
  static currentOverlayIndex = 1000;

  private overlayIndex = OverlayComponent.currentOverlayIndex++;

  render() {
    return (
      <div className='overlay' style={{ zIndex: this.overlayIndex }} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}

export interface OverlayProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
}
