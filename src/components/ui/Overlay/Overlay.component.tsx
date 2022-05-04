import React, { createRef, RefObject } from 'react';
import './Overlay.style.scss';

export default class OverlayComponent extends React.PureComponent<OverlayProps> {
  static currentOverlayIndex = 1000;

  private overlayIndex = OverlayComponent.currentOverlayIndex++;
  private rootRef: RefObject<HTMLDivElement>;

  constructor(props: OverlayProps) {
    super(props);

    this.blockScroll.bind(this);
    this.rootRef = createRef();
  }

  componentDidMount() {
    this.rootRef.current?.addEventListener('wheel', this.blockScroll, { passive: false });
  }

  componentWillUnmount() {
    this.rootRef.current?.removeEventListener('wheel', this.blockScroll);
  }

  blockScroll(event: WheelEvent) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  render() {
    return (
      <div
        ref={this.rootRef}
        className='overlay'
        style={{ zIndex: this.overlayIndex }}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

export interface OverlayProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
}
